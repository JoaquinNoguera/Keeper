const User = require ('../../db/models/user');
const sendTokens = require('../../auth').sendTokens;
const createRefreshToken = require('../../auth').createRefreshToken;
const createAccessToken = require('../../auth').createAccessToken;
const userAuthenticate = require('../../auth').userAuthenticate;
const isAuthenticate = require('../../auth').isAuthenticate;
const isAuthorization = require('../../auth').isAuthorization;
const clearTokens = require('../../auth').clearTokens;
const generateRecoveryCode = require('../../utils').generateRecoveryCode;
const createHash = require('crypto').createHash;
const sendEmail = require('../../sendgrid').sendEmail; 

const resolvers = {
    Query:{
        currentUser: async (_,args,context)=> {   
            const user = await userAuthenticate(context);
            return {user};
        },
        getAccessUser: (_,args,context) => {

            if(isAuthorization(context)) {
                return 2;
                
            }
                
            if(isAuthenticate(context)) {
                return 1;
            }
            return 0;
        },
        getUserByCode: async (_,{code}) =>{
            const user = await User.findOne({
                recoveryCode: createHash("sha256")
                                                    .update(code)
                                                    .digest("hex")
            });

            if(!user) throw new Error('El codigo que ha ingresado es invalido');
    
            return {user};
        },
        getCards: async(_,{section},context) =>{
            const user = await userAuthenticate(context);

            const index = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());
            
            if( index === -1 ) throw new Error('No existe una sección con ese nombre');
            
            return user.section[index].cards;
        } 
        
    },
    Mutation: {
        login: async (_, {username,password},context) => {
            
            const user = await User.findOne({ 
                $or: [
                    {name: username},
                    {email: username}
                ]
            });

            if(!user){
                throw new Error("El usuario que ha ingresado es invalido o no existe");
            }

            const valid = user.validPassword(password);
           
            if (!valid) throw new Error ("El usuario que ha ingresado es invalido o no existe");
            
            sendTokens(context,
                                createRefreshToken(user),
                                createAccessToken(user)
                        );

            return {user};
        },

        singup: async (_, {input}, context) => {
            
            const {name, email,password} = input;
      
            const UserAlredyExist = await User.findOne({ 
                $or: [
                    {name: name},
                    {email: email}
                ]
            })
            
            if(UserAlredyExist){
                if(email === UserAlredyExist.email) throw new Error('Ya existe un usuario registrado con ese email');
                if(name === UserAlredyExist.name) throw new Error('Ya existe un usuario registrado con ese nombre');
            }
           
            
            const newUser = new User(input);
      
            newUser.password = newUser.generateHash(password);
      

            newUser.save();
      
    

            sendTokens(context,
                                createRefreshToken(newUser),
                                createAccessToken(newUser)
                        );
      
            return {user: newUser};
        },
        logout: (_,arg,context) =>{
            clearTokens(context);
            return true;
        },
        changePassword: async (_, {oldPassword,newPassword},context) => {
            
            const user = await userAuthenticate(context);

            let valid = user.validPassword(oldPassword);

            if(!valid) throw new Error('Su contraseña es incrrecta');

            user.password = user.generateHash(newPassword);
            
            valid = await User.findByIdAndUpdate(user._id,{password: user.password})

            if(!valid) throw new Error('Ha ocurrido un error, por favor intentelo mas tarde');

            sendTokens(context,
                createRefreshToken(user),
                createAccessToken(user)
            );
            
            return true;
        },

        newAccessToken: async (_,{password},context) => {
            
            const user = await userAuthenticate(context);

            if(!user) throw new Error('El usuario no esta autentificado');
            
            if(!user.validPassword(password)) throw new Error('La contraseña es incorrecta'); 
            
            sendTokens(context,
                        createRefreshToken(user),
                        createAccessToken(user));
            
            return true;
        },

        sendCodEmail: async (_,{username})=>{
            
            const user = await User.findOne({ 
                $or: [
                    {name: username},
                    {email: username}
                ]
            });
        
            if(!user) throw new Error('');
            
            const code = generateRecoveryCode(5);

            user.recoveryCode = user.generateHashRecoveryCode(code);
           
            user.save();

            sendEmail('CODE',{
                email: user.email,
                code: code,
                user: user.name,
            });
           
            return true;
        },

        recoveryPassword: async (_,{code,newPassword}) => {
            const user = await User.findOne({
                recoveryCode: createHash("sha256").update(code).digest("hex")
            });

            if(!user) throw new Error('El codigo que ha ingresado es invalido');

            user.password = user.generateHash(newPassword);
            user.recoveryCode = null;
            user.save();

            return true;
        },
        
        checkCode: async (_,{code}) =>{
            const user = await User.findOne({
                recoveryCode: createHash("sha256")
                                                    .update(code)
                                                    .digest("hex")
            });

            if(!user) throw new Error('El codigo que ha ingresado es invalido');
            
            return true;
        },
        createSection: async (_,{input},context) =>{
            const {color,icon,title,description} = input;
            const user = await userAuthenticate(context);

            const valid = user.section.find(element => element.title.toUpperCase() === title.toUpperCase());
            if(valid) throw new Error('Ya hay una sección creada con ese nombre');

            user.section.unshift({
                color,icon,title,description
            });
            user.save();

            return {user};
            
        },
        deleteSection: async (_,{title},context) =>{
            const user = await userAuthenticate(context);
            const valid = user.section.findIndex(element => element.title.toUpperCase() === title.toUpperCase());
            user.section.splice(valid,1);
            user.save()
            return {user};
        },
        editSection: async (_,{oldTitle,input},context) =>{
            const {color,icon,title,description} = input;
            const user = await userAuthenticate(context);
            const index = user.section.findIndex(element => element.title.toUpperCase() === oldTitle.toUpperCase());
            if(title !== oldTitle){
                const valid = user.section.findIndex(element => element.title.toUpperCase() === title.toUpperCase());
                if(valid !== -1) throw new Error('Ya existe una seccion con ese nombre')
            }
            user.section[index].color = color;
            user.section[index].icon = icon;
            user.section[index].title = title;
            user.section[index].description = description;
            user.save();
            return {user};
        },
        createCard: async (_,{section,input},context) => {
            const {color,title,description} = input;

            const user = await userAuthenticate(context);

            const index = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( index === -1 ) throw new Error('No existe una sección con ese nombre');

            const valid = user.section[index].cards.findIndex(element => element.title.toUpperCase() === title.toUpperCase());
            
            if(valid !== -1) throw new Error('Ya existe una nota con ese nombre');

            user.section[index].cards.unshift({
                color,title,description
            })

            user.save();


            return  user.section[index].cards;
        },
        deleteCard: async(_,{section, card},context) => {

            const user = await userAuthenticate(context);

            const valid = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( valid === -1 ) throw new Error('No existe una sección con ese nombre');

            const index = user.section[valid].cards.findIndex(element => element.title.toUpperCase() === card.toUpperCase());
            
            if( index === -1) throw new Error('No existe una nota con ese nombre');

            user.section[valid].cards.splice(index,1);

            user.save();

            return user.section[valid].cards;
        },
        editCard: async (_,{section,card,input},context) => {

            const {color,title,description} = input;

            const user = await userAuthenticate(context);

            const valid = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( valid === -1 ) throw new Error('No existe una sección con ese nombre');

            const index = user.section[valid].cards.findIndex(element => element.title.toUpperCase() === card.toUpperCase());
            
            if( index === -1) throw new Error('No existe una nota con ese nombre');

            user.section[valid].cards[index].title = title;
            user.section[valid].cards[index].description = description;
            user.section[valid].cards[index].color = color;

            user.save();

            return user.section[valid].cards;
        }
    }

};

module.exports = resolvers;
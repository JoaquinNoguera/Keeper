const User = require ('../../db/models/user');
const generateRecoveryCode = require('../../utils').generateRecoveryCode;
const { getUser, authenticateUser, logOff} = require('../../security');
const { sendRecoveryEmail } = require('../../mail');
const createHash = require('crypto').createHash;

const resolvers = {
    Query:{
        authenticate: ( _ , {} , context) => {
            const user = getUser({ req: context });
            return { user };
        },
        getUserByCode: async (_,{code}) =>{
            const user = await User.findOne({
                recoveryCode: createHash("sha256")
                                                    .update(code)
                                                    .digest("hex")
            });

            if(!user) throw new Error('El codigo que ha ingresado es invalido');
    
            return { user };
        },
        getCards: async ( _ , { section } , context ) =>{
            const user = await authenticateUser({ req: context });

            const index = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());
            
            if( index === -1 ) throw new Error('No existe una sección con ese nombre');
            
            return user.section[index].cards;
        } 
        
    },
    Mutation: {
        login: async (_, { username, password },{ res }) => {
            const user = await User.findOne({ 
                $or: [
                    {name: username},
                    {email: username}
                ]
            });

            if( !user ) {
                throw new Error("El usuario que ha ingresado es invalido o no existe");
            }

            const valid = user.validPassword(password);
           
            if ( !valid ) throw new Error ("El usuario que ha ingresado es invalido o no existe");
            
            authenticateUser({ user, res });

            console.log(user)

            return { user };
        },
        singup: async (_, { input }, { res } ) => {
            
            const {name, email, password } = input;
      
            const UserAlredyExist = await User.findOne({ 
                $or: [
                    {name: name},
                    {email: email}
                ]
            })
            
            if( UserAlredyExist ){
                if( email === UserAlredyExist.email ) throw new Error('Ya existe un usuario registrado con ese email');
                if( name === UserAlredyExist.name ) throw new Error('Ya existe un usuario registrado con ese nombre');
            }
           
            
            const newUser = new User(input);
      
            newUser.password = newUser.generateHash(password);
      

            newUser.save();
      
            authenticateUser({ user: newUser, res });
            
            return {user: newUser};
        },
        logout: (_, {}, { res } ) =>{
            logOff({ res });
            return true;
        },
        changePassword: async (_, { oldPassword, newPassword }, context) => {

            const user = await getUser({ req: context })

            let valid = user.validPassword(oldPassword);

            if(!valid) throw new Error('Su contraseña es incrrecta');

            user.password = user.generateHash(newPassword);
            
            valid = await User.findByIdAndUpdate(user._id,{password: user.password})

            if(!valid) throw new Error('Ha ocurrido un error, por favor intentelo mas tarde');

            authenticateUser( { user, res: context.res })
            
            return true;
        },
        sendCodEmail: async (_,{ username })=>{
            
            const user = await User.findOne({ 
                $or: [
                    {name: username},
                    {email: username}
                ]
            });
        
            if(!user) throw new Error(' El usuario no existe ' );
            
            const code = generateRecoveryCode(5);

            user.recoveryCode = user.generateHashRecoveryCode(code);
           
            user.save();

            sendRecoveryEmail({
                email: user.email,
                code: code,
                username: user.name,
            });
           
            return true;
        },
        recoveryPassword: async (_,{ code, newPassword }) => {
            const user = await User.findOne({
                recoveryCode: createHash("sha256").update(code).digest("hex")
            });
            
            if(!user) throw new Error('El codigo que ha ingresado es invalido');

            user.password = user.generateHash(newPassword);
            user.recoveryCode = null;
            user.save();

            return true;
        },
        checkCode: async (_,{ code }) =>{
            const user = await User.findOne({
                recoveryCode: createHash("sha256")
                                                    .update(code)
                                                    .digest("hex")
            });
            if(!user) throw new Error('El codigo que ha ingresado es invalido');  
            return true;
        },
        createSection: async (_,{ input }, context) =>{
            const { color, icon, title, description } = input;
            const user = await getUser({ req: context });
0
            const valid = user.section.find( element => element.title.toUpperCase() === title.toUpperCase() );
            if( valid ) throw new Error('Ya hay una sección creada con ese nombre');

            user.section.unshift({
                color,icon,title,description
            });
            user.save();

            authenticateUser({ user, res: context.res });

            return user.section;
        },
        deleteSection: async (_, { title }, context ) =>{

            const user = await getUser({ req: context });
            const valid = user.section.findIndex(element => element.title.toUpperCase() === title.toUpperCase());
            user.section.splice(valid,1);
            user.save();
            authenticateUser( { user, res:context.res });

            return user.section;
        },
        editSection: async (_,{ oldTitle, input }, context ) =>{
            const { color, icon , title , description } = input;
            const user = await getUser({ req: context });
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

            authenticateUser({ user, res: context.res });
            return user.section;
        },
        createCard: async (_,{ section,input }, context ) => {
            const {color,title,description} = input;

            const user = await getUser({ req: context });

            const index = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( index === -1 ) throw new Error('No existe una sección con ese nombre');

            const valid = user.section[index].cards.findIndex(element => element.title.toUpperCase() === title.toUpperCase());
            
            if(valid !== -1) throw new Error('Ya existe una nota con ese nombre');

            user.section[index].cards.unshift({
                color,title,description
            })

            user.save();

            authenticateUser({ user, res: context.res });
            
            return  user.section[index].cards;
        },
        deleteCard: async(_,{ section, card }, context ) => {

            const user = await getUser({ req: context });

            const valid = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( valid === -1 ) throw new Error('No existe una sección con ese nombre');

            const index = user.section[valid].cards.findIndex(element => element.title.toUpperCase() === card.toUpperCase());
            
            if( index === -1) throw new Error('No existe una nota con ese nombre');

            user.section[valid].cards.splice(index,1);

            user.save();
            
            authenticateUser({ user, res: context.res });

            return user.section[valid].cards;
        },
        editCard: async (_,{ section, card , input }, context ) => {

            const {color,title,description} = input;

            const user = await getUser({ req: context });

            const valid = user.section.findIndex(element => element.title.toUpperCase() === section.toUpperCase());

            if( valid === -1 ) throw new Error('No existe una sección con ese nombre');

            const index = user.section[valid].cards.findIndex(element => element.title.toUpperCase() === card.toUpperCase());
            
            if( index === -1) throw new Error('No existe una nota con ese nombre');

            user.section[valid].cards[index].title = title;
            user.section[valid].cards[index].description = description;
            user.section[valid].cards[index].color = color;

            user.save();

            authenticateUser({ user, res: context.res })

            return user.section[valid].cards;
        }
    }

};

module.exports = resolvers;
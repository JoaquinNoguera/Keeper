import React from 'react';
import client from '../apollo';
import { useQuery } from '@apollo/react-hooks';
import {
        SUBMIT_USER,
        SUBMIT_NEWUSER,
        SEND_EMAIL,
        GET_ACCESS_USER,
        CHECK_CODE,
        GET_USER_BY_CODE,
        RECOVERY_PASSWORD,
        GET_CURRENT_USER,
        LOGOUT,
        CHANGE_PASSWORD,
        CREATE_SECTION,
        DELETE_SECTION,
        EDIT_SECTION,
        CREATE_CARD,
        GET_CARDS,
        DELETE_CARD,
        EDIT_CARD
} from '../apollo/querys';


export default function withRequest(WrappedComponent){
    return (props) => {

        const submitUser = async (username,password) => {
            try{

                const response = await client.mutate({
                    variables: {username,password},
                    mutation: SUBMIT_USER
                });

                return [true,response.data.login.user];
            
            }catch(err){
            
                return [false,err.graphQLErrors[0].message];
            
            }
        }

        const submitNewUser = async(name,email,password) => {
            
            try{
                const response = await client.mutate({
                    variables: {name,email,password},
                    mutation: SUBMIT_NEWUSER,
                });
            
                return [true,response.data.singup.user];
            
            }catch(err){
            
                return [false,err.graphQLErrors[0].message];
            
            }
        }
        
        const sendEmail = async(username) => {
            try{
            
                const response = await client.mutate({
                    variables: {username},
                    mutation: SEND_EMAIL,
                });
            
                return [true,response.data.sendCodEmail];
            
            }catch(err){
            
                return [false,err.graphQLErrors[0].message];
            
            }
        }

        const checkCode = async (code) =>{ 
            try{
                const response = await client.mutate({
                    variables: {code},
                    mutation: CHECK_CODE,
                });
                return [true,response.data.checkCode];
            }catch(err){
                
                return [false,err.graphQLErrors[0].message];

            }
        }

        const recoveryPassword = async (code,newPassword) =>{ 
            try{
                const response = await client.mutate({
                    variables: {code,newPassword},
                    mutation: RECOVERY_PASSWORD,
                });
                return [true,response.data.checkCode];
            }catch(err){

                return [false,err.graphQLErrors[0].message];

            }
        }

        const logout = async () => {
            try{
                const response = await client.mutate({
                    mutation: LOGOUT
                });
                return [true,response.data.logout]
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }

        const changePassword = async (newPassword,oldPassword) =>{
            try{
                const response = await client.mutate({
                    variables: {newPassword,oldPassword},
                    mutation: CHANGE_PASSWORD,
                });
                return [true,response.data.changePassword];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }

        const createSection = async(title,description,color,icon) => {
            try{
                const response = await client.mutate({
                    variables: {title,description,color,icon},
                    mutation: CREATE_SECTION,
                });
                return [true,response.data.createSection];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }

        const editSection = async(title,description,color,icon,oldTitle) => {
            try{
                const response = await client.mutate({
                    variables: {title,description,color,icon,oldTitle},
                    mutation: EDIT_SECTION,
                });
                return [true,response.data.editSection];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }

        const deleteSection = async (title) => {
            try{
                const response = await client.mutate({
                    variables: {title},
                    mutation: DELETE_SECTION
                });
                return[true, response.data.deleteSection];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }


        const createCard = async (section,title,description,color) =>{
            try{
                const response = await client.mutate({
                    variables: {title,section,description,color},
                    mutation: CREATE_CARD
                });
                return[true, response.data.createCard];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            } 
        }

        const deleteCard = async (section,card) => {
            try{
                const response = await client.mutate({
                    variables: { section, card},
                    mutation: DELETE_CARD
                });
                return[true, response.data.deleteCard];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }

        const editCard = async (section, card, title, description, color) => {
            try{
                const response = await client.mutate({
                    variables: { section, card, title, description, color},
                    mutation: EDIT_CARD
                });
                return[true, response.data.editCard];
            }catch(err){
                return [false,err.graphQLErrors[0].message];
            }
        }


        const mutation = async (type,body) => {
            
            if(!type) return[false,'No declaro el tipo de query'];
            
            switch(type){
                case'SUBMIT_USER':{
                    const {username,password} = body;
            
                    if(!username || !password) return [false,'Faltan Campos'];
            
                    return await submitUser(username,password);
            
                }
            
                case'SUBMIT_NEWUSER':{
            
                    const {name,email,password,repeat} = body;
            
                    if(password !== repeat) {     
            
                        return [false,"las contraseñas son distintas"];
            
                    }else{
            
                        if(!name || !email || !password) [false,'Faltan Campos'];
            
                        return await submitNewUser(name,email,password);
            
                    }
                }
            
                case'SEND_EMAIL':{
            
                    const {username} = body;
            
                    if(!username) [false,'Faltan Campos'];
            
                    return await sendEmail(username);
            
                }

                case 'CHECK_CODE':{
                    const {code} = body;

                    if(!code) return[false,'Falan Campos'];

                    return await checkCode(code);

                }

                case 'RECOVERY_PASSWORD': {

                    const {code, newPassword, repeat } = body;

                    if(!code || !newPassword || !repeat) return[false,'Faltan Campos'];

                    if(newPassword !== repeat) return[false,'Las contraseñas no son iguales'];

                    return await recoveryPassword(code,newPassword);
                }

                case 'LOGOUT': {
                    return await logout();
                }
                case 'CHANGE_PASSWORD':{
                    const {newPassword, repeat, oldPassword} = body;

                    if(!oldPassword || !newPassword || !repeat) return[false,'Faltan Campos'];

                    if(newPassword !== repeat) return[false,'Las contraseñas no son iguales'];

                    return await changePassword(newPassword,oldPassword);
                
                }
                case 'CREATE_SECTION':{
                    const {title, description, color, icon} = body;
                    if(!title || !description || !color || !icon) return [false,'Faltan Campos'];

                    return await createSection(title,description,color,icon);
                }
                case 'DELETE_SECTION':{
                    const {title} = body;
                    if(!title) return [false,'Faltan Campos'];
                    return await deleteSection(title);
                }
                case 'EDIT_SECTION':{
                    const {title, description, color, icon,oldTitle} = body;
                    if(!title || !description || !color || !icon || !oldTitle) return [false,'Faltan Campos'];

                    return await editSection(title,description,color,icon,oldTitle);
                }
                case 'CREATE_CARD':{
                    const {title,description,color,section} = body;
                    if(!title || !description || !color || !section) return [false,'Faltan Campos'];
                    return await createCard(section,title,description,color);
                }
                case 'DELETE_CARD': {
                    const { section, card} = body;

                    if(!section || !card ) return [false,'Faltan Campos'];

                    return await deleteCard(section,card)
                }
                case 'EDIT_CARD': {
                    const {section, card, title, description, color} = body;

                    if(!section || !card || !title || !description || ! color) return [false,'Faltan Campos'];

                    return await editCard(section,card,title,description,color);
                }
            
            }
        }

        const getAccessUser = () =>{

            const {data,loading,error,networkStatus} = useQuery(GET_ACCESS_USER,{
                fetchPolicy:'no-cache'
            });

            if(networkStatus === 8) return[data,loading,'Server dont responde']
            
            return[data,loading,error];

        }

        const getUserByCode = (code) =>{
            const {data,loading,error} = useQuery(GET_USER_BY_CODE,{
                variables: {code},
                fetchPolicy:'no-cache'
            });
            return[data,loading,error];

        }

        const getCurrentUser = () =>{
            const {data,loading,error} = useQuery(GET_CURRENT_USER,{
                fetchPolicy:'no-cache'
            });
            return[data,loading,error];

        }
        
        const getCards = (section) => {
            const {data,loading,error} = useQuery(GET_CARDS, {
                variables: {section}
            });
            return [data, loading, error];
        }
        const querys = (type,body) =>{

            if(!type) return [null,null,"No se declaro el tipo de consulta"];

            switch(type){

                case 'GET_ACCESS_USER':{
                    return getAccessUser();
                }

                case 'GET_USER_BY_CODE': {
                    const {code} = body;

                    if(!code)  [null,null,"Faltan campos"]

                    return getUserByCode(code);
                }
                
                case 'GET_CURRENT_USER':{
                    return getCurrentUser();
                }
                case 'GET_CARDS': {
                    const {section} = body;

                    if(!section) [null,null,"Faltan campos"];

                    return getCards(section);

                }
            }
        }


        return(

            <WrappedComponent
                {...props}
                mutation = {mutation}
                querys={querys}
            />

            );
    }
}
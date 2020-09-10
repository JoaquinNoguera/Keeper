import makeRequest from '../../utils/makeRequest';
import { AUTHENTICATE } from '../../utils/querys';
import { LOGIN, SINGUP, CHECK_CODE, RECOVERY_PASSWORD, LOGOUT } from '../../utils/mutation';
export const authenticationActions = {
    AUTHENTICATE: "AUTHENTICATE",
    AUTHENTICATE_ME: "AUTHENTICATE_ME",
    LOGOUT: "LOGOUT",
    GET_AUTHENTICATE_ERROR: "GET_AUTHENTICATE_ERROR",
    CHANGE_ACCOUNT: "CHANGE_ACCOUNT",
    CLEAR_MESSAGE: "CLEAR_MESSAGE",
    SET_SUCCESSFUL: "SET_SUCCESSFUL",
    SET_ERROR: "SET_ERROR",
    SET_COD: "SET_COD"
}

export const clearMessage = () => {
    return {
        type: authenticationActions.CLEAR_MESSAGE
    }
}

export const setError = ( message ) => {
    return {
        type: authenticationActions.SET_ERROR,
        payload: {
            message
        }
            
    }
}

export const setSuccessful = ( message ) => {
    return {
        type: authenticationActions.SET_SUCCESSFUL,
        payload: {
            message
        }
            
    }
}

export const logut = async () => {
    try{
        const response = await makeRequest({
            actionPass: authenticationActions.LOGOUT,
            actionError: authenticationActions.GET_AUTHENTICATE_ERROR,
            query: LOGOUT
        });

        return response;

    } catch( error ){
        console.log( error ); 
    } 
}

export const changePassword = async ( code, password ) => {
    try{
        const response = await makeRequest({
            actionPass: authenticationActions.SET_SUCCESSFUL,
            actionError: authenticationActions.GET_AUTHENTICATE_ERROR,
            query: RECOVERY_PASSWORD,
            variables: {
                code,
                newPassword: password
            }
        });

        if( response.payload.data )
            response.payload.data = response.payload.message = "Contraseña cambiada correctamente";

        return response;

    } catch( error ){
        console.log( error ); 
    } 
} 


export const setCod = async ( code ) => {
    try{
        const response = await makeRequest({
            actionPass: authenticationActions.SET_COD,
            actionError: authenticationActions.GET_AUTHENTICATE_ERROR,
            query: CHECK_CODE,
            variables: {
                code
            }
        });

        if( response.payload.data )
            response.payload.data = response.payload.cod = code;
    
        return response;
    } catch( error ){
        console.log( error );
    }
}

export const singup = async ( name, password, email ) => {
    try{
        const response = await makeRequest({
            actionPass: authenticationActions.AUTHENTICATE,
            actionError: authenticationActions.GET_AUTHENTICATE_ERROR,
            query: SINGUP,
            variables: {
                name,
                password,
                email
            }
        });

        if( response.payload.data )
            response.payload.data = response.payload.data.singin;
    
        return response;

    }catch( error ){
        console.log(error)
    }
}

export const authenticateMe = async () => {
    try{

        const response =  await makeRequest({
            actionPass: authenticationActions.AUTHENTICATE_ME,
            actionError: authenticationActions.AUTHENTICATE_ME,
            query: AUTHENTICATE
        });
        
        
        if( response.payload.data )
            response.payload.data = response.payload.data.authenticate;
        
        return response;

    }catch(error){
        console.log(error);
    }

}

export const auhtenticate = async ( username, password ) => {

    try{
            const response = await makeRequest({
                actionPass: authenticationActions.AUTHENTICATE,
                actionError: authenticationActions.GET_AUTHENTICATE_ERROR,
                query: LOGIN,
                variables: {
                    username,
                    password
                }
            });
        

            if( response.payload.data )
                response.payload.data = response.payload.data.login;

            return response;
    } catch(error) {
        console.log(error);
    }
    
}

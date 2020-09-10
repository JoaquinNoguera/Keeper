import { authenticationActions } from '../actions/authenticateActions';

const defaultState = {
    user: null,
    logedIn: false,
    error: false,
    loading: true,
    successful: false,
    cod: null
};

const authenticationReducer = (state = defaultState, { type, payload }) => {
    
    switch(type){
        case authenticationActions.AUTHENTICATE:{
            return{
                ...state,
                logedIn: true,
                user: payload.data.user,
                loading: false
            }
        }
        case authenticationActions.AUTHENTICATE_ME:{
            if( payload.error ) 
            return{
                ...state,
                logedIn: false,
                user: null,
                loading: false
            }
            else
                return{
                    ...state,
                    logedIn: true,
                    user: payload.data.user,
                    loading: false
                }
        }
        case authenticationActions.LOGOUT: {
           return{
               ...state,
               logedIn: false,
               user: null,
               loading: false
           }
        }
        case authenticationActions.GET_AUTHENTICATE_ERROR:{
                return{
                    ...state,
                    error: payload.error,
                    loading: false
                }
        }
        case authenticationActions.CHANGE_ACCOUNT: {
            return{
                ...state,
                user: null,
                loading: false
            }
        }
        case authenticationActions.CLEAR_MESSAGE: {
            return{
                ...state,
                error: false,
                successful: false
            }
        }
        case authenticationActions.SET_ERROR: {
            return{
                ...state,
                error: [{
                    message: payload.message
                }]
            }
        }
        case authenticationActions.SET_SUCCESSFUL:{
            return{
                ...state,
                successful: payload.message
            }
        }
        case authenticationActions.SET_COD:{
            return{
                ...state,
                error: false,
                cod: payload.cod
            }
        }

        default: {
            return state;
        }
    }
}

export default authenticationReducer;
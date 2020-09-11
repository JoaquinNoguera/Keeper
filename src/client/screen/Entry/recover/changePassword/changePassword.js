import React,{ useState, useEffect } from 'react';
import useInput from '../../../../components/useInput';
import Loading from '../../../../components/loading';
import {Link,Redirect} from 'react-router-dom';

import makeRequest from '../../../../utils/makeRequest';
import { GET_USER_BY_CODE, RECOVERY_PASSWORD } from '../../../../graphQL/querys';

function ChangePassword(props){

    const { history } = props;
    const code = props.match.params.code;


    const [ loading, toogleLoading ] = useState(true);
    
    
    const getUser = async () => {
        const { derror } = await makeRequest({
            query: GET_USER_BY_CODE,
            variables: {
                code : code
            }});
            
        if ( error ) return history.push("/recover");
        else toogleLoading(true);
    }
    
    useEffect( () => {
        getUser();
    }, []);


    const [newPassword,passwordInput] = useInput(
        {
            type:"password",
            placeholder:"Contraseña",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [repeat,repeatInput] = useInput(
        {
            type:"password",
            placeholder:"Repetir contraseña",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [show,setShow] = useState(false);

    const [error,setError] = useState(false);

    const [message,setMessage] = useState('');


    if( loading ) return <Loading/>

    else{
        const name = data.getUserByCode.user.name
        const handleSubmit = async () => {
            const { response, error }= await makeRequest({
                query: RECOVERY_PASSWORD,
                variables: {
                    code,
                    newPassword,
                    repeat
                }
            });

            if( error ){
                setError(true);
                setMessage( error[0].message);
            }else{
                setMessage('La contraseña ha sido cambiada correctamente')
                setError(false);
            }
            if(! show )setShow(true);
        }
        
        return(
            <form
            className="form-wrapper" 
            onSubmit={async (event) => { 
                        event.preventDefault();
                        handleSubmit();
                        }
                    }
            >
                <h2 
                    className="subtitle-entry"
                    > 
                    Recuperar contraseña 
                </h2>
            
                <p 
                    className="text-entry 
                    text-justify
                    "
                    >
                    Hola {name}, llena los siguientes campos
                    para poder ingresar la nueva contraseña.
                </p>
                                        
                {
                    show 
                        &&
                    <div 
                        className={(error) ? ('error-message') : ('successful-message')}
                    >
                        {message}
                    </div>
                }

                {passwordInput}

                {repeatInput}
            
                <button 
                    type="submit" 
                    className="button-entry"
                >
                    Cambiar
                </button>

                <p 
                    className="span-entry"
                >   
                    Ya tienes cuenta
                </p>
            
                <Link 
                    to='/' 
                    className="link-entry account"
                >
                    Iniciar sessión
                </Link>
                
                <p 
                    className="span-entry"
                >
                    No tienes cuenta
                </p>
                
                <Link 
                    to='/singup' 
                    className="link-entry account"
                >
                    Crear cuenta
                </Link>
            </form>
        );
    }   
                
}

export default ChangePassword;
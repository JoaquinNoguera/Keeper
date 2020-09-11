import React, { useState } from 'react';
import {
    Link
} from 'react-router-dom';
import useInput from '../../../components/useInput';
import makeRequest from '../../../utils/makeRequest';
import { SUBMIT_USER } from '../../../graphQL/querys';

function SingIn({ setUser }){

    const [username,usernameInput] = useInput(
        {
            type:"text",
            placeholder: "Correo electronico o nombre de usuario",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [password,passwordInput] = useInput(
        {
            type:"password",
            placeholder:"Contraseña",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [show,setShow] = useState(false);
    
    const [message,setMessage] = useState('');

    const handleSubmit = async() => {
    
        const { response, error }= await makeRequest({
                query: SUBMIT_USER,
                variables:{
                        username: username,
                        password: password
                }
        });
        
        if( error ) {
            setMessage(error[0].message);
            setShow(true);
    
        }else{
            setUser(response.login.user);
        }
    }
    
    return(
                <form 
                    className="form-wrapper" 
                    onSubmit={async (event) => {
                                        event.preventDefault(); 
                                        handleSubmit();
                            }}
                >
                    <h1 
                        className="title-entry text-center"
                    >
                        Keeper
                    </h1>

                    <p 
                        className="text-entry text-center"
                    >
                        Anota todo lo importante
                    </p>
                
                    {
                        show 
                            && 
                        <div 
                            className="error-message"
                        >
                            {message}
                        </div>
                    }
            
                {usernameInput}
            
                {passwordInput}
            
                <button 
                    type="submit" 
                    className="button-entry"
                >
                        Acceder
                </button>
            
                <Link 
                    to="/forgot" 
                    className="link-entry link-small"
                >
                    ¿olvidaste la contraseña?
                </Link>
            
                <Link 
                    to="/recover"
                        className="link-entry forgot link-small"
                >
                    ¿Tenes un codigo de recuperación de contraseña?
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
                    Crear Cuenta
                </Link>
            </form>
    );
}

export default SingIn;
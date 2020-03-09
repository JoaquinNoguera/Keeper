import React, {useState} from 'react';
import useInput from '../../../hooks/useInput';
import withRequest from '../../../Hocs/graphqlRequest';
import {Link} from 'react-router-dom'

function Forgot(props){

    const {mutation} = props;
    
    const [username,usernameInput] = useInput(
        {
            type:"text",
            placeholder: "Correo electronico o nombre de usuario",
            required: true,
            className:"input-entry",
            init:""
        }
    );
    
    const handleSubmit = async () => {
        
        await mutation('SEND_EMAIL',{
            username: username
        });
        
        setShow(true);
        setMessage('Se ha enviado el codigo de recuperación a su correo. Si no lo encuentra revise la carpeta de span');
    
    }

    const [show,setShow] = useState(false);
    
    const [message,setMessage] = useState('');


    return(
        <form 
            className="form-wrapper" 
            onSubmit={(event) => { 
                                    event.preventDefault(); 
                                    handleSubmit();
                                }
                    }
        >
            
            <h2 
                className="subtitle-entry"
            > 
                ¿Olvidaste tu contraseña? 
            </h2>

            <p 
                className="text-entry 
                            text-justify
                            "
            >
                Para recueprar su contraseña por favor ingrese su 
                nombre de usuario o correo electronico en el siguiente 
                espacio y se le será enviado un codigo de recuperación 
                al email asociado a su cuenta. 
            </p>

            {   show 
                    && 
                <div 
                    className="successful-message"
                >
                    {message}
                </div>
            }
            
            {usernameInput}
            
            <button 
                type="submit" 
                className="button-entry"
            >
                Enviar
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

export default withRequest(Forgot);
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../../components/useInput';

import makeRequest from '../../../utils/makeRequest';
import { SUBMIT_NEWUSER } from '../../../graphQL/querys';

function SingUp({ setUser }){

    const [username,usernameInput] = useInput(
        {
            type:"text",
            placeholder: "Nombre de usuario",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [email,emailInput] = useInput(
        {
            type:"email",
            placeholder: "Correo electronico",
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

    const [message,setMessage] = useState('');

    const handleSubmit = async() => {

        const { error } = await makeRequest( {
            query: SUBMIT_NEWUSER,
            variables: {    
                name: username,
                email: email,
                password: password,
                repeat: repeat
            }
        });

        if( error ) {
            setMessage( error[0].message );
            setShow(true);

        } else{
            setUser( response.singup.user )
            history.push(`/`)
        }
    }

    return(
            <form 
            className="form-wrapper" 
            onSubmit={async (event) => { 
                event.preventDefault(); 
                handleSubmit()
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

            {emailInput}

            {passwordInput}

            {repeatInput}
            
            <button 
                type="submit" 
                className="button-entry"
            >
                Crear Cuenta
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
            </form> 
    ); 
}

export default SingUp;
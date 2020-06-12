import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import whitRequest from '../../../Hocs/graphqlRequest';
import AccessContext from '../../../context/access';

function SingIn(props){
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
    
        const [data,response]= await mutation('SUBMIT_USER',{
            username: username,
            password: password
        });
    
        if(!data) {
    
            setMessage(response);
            setShow(true);
            return false;
    
        }else{
    
            return true;
    
        }
    }
    
    return(
    
        <AccessContext.Consumer>
            { (context) =>
                <form 
                    className="form-wrapper" 
                    onSubmit={async (event) => {
                                            event.preventDefault(); 
                                            if(await handleSubmit()) {
                                                                    context.changeAccess(2);
                                                                 }
                                            }
                            }
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
        }
        </AccessContext.Consumer>
    );
}

export default whitRequest(SingIn);
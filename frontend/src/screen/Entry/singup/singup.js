import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import withRequest from '../../../Hocs/graphqlRequest';
import useInput from '../../../hooks/useInput';
import AccessContext from '../../../context/access';

function SingUp(props){

    const {mutation, history} = props;

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

        const [data,response]= await mutation('SUBMIT_NEWUSER',{
            name: username,
            email: email,
            password: password,
            repeat: repeat
        });

        if(!data) {

            setMessage(response);
            setShow(true);
            return false;

        } else{

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
                                            history.push('/');
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
    }
    </AccessContext.Consumer>
    ); 
}

export default withRequest(SingUp);
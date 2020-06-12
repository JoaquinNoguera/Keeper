import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import withRequest from '../../../Hocs/graphqlRequest';
import useInput from '../../../hooks/useInput';

function Recover(props){
    
    const { mutation, history } = props;

    const [code,codeInput] = useInput(
        {
            type:"text",
            placeholder: "Codigo de recuperación",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [show,setShow] = useState(false);
    
    const [message,setMessage] = useState('');

    const handleSubmit = async () => {
        const [data,response] = await mutation('CHECK_CODE',{
            code: code
        });
        if(!data) {
            setMessage(response);
            setShow(true);
        }else{
            history.push(`/recover/${code}`)
        }

    }

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
                ¿Tienes un codigo de recuperación? 
            </h2>
            
            <p 
                className="text-entry 
                            text-justify
                            "
            >
                Para poder restablecer su contraseña ingrese
                el codigo de recuperación que se le fue enviado
                a su correo aquí debajo. 
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

            {codeInput}
        
            <button 
                type="submit" 
                className="button-entry"
            >
                Comprobar
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

export default withRequest(Recover);
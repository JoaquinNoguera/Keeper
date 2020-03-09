import React,{useState} from 'react';
import useInput from '../../../../hooks/useInput';
import withRequest from '../../../../Hocs/graphqlRequest';
import Loading from '../../../../component/loading';
import {Link,Redirect} from 'react-router-dom'
function ChangePassword(props){
    
    const { querys, mutation } = props;
    
    const code = props.match.params.code;
    

    const [data, loading] = querys('GET_USER_BY_CODE', {
        code : code
    });
    

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


    if(loading) return <Loading/>

    else if(!data) return <Redirect to="/recover"/>

    else{
        const name = data.getUserByCode.user.name
        const handleSubmit = async () => {
            const [exist,response]= await mutation('RECOVERY_PASSWORD',{
                code,
                newPassword,
                repeat
            });

            if(!exist){
                setError(true);
                setMessage(response);
            }else{
                setMessage('La contraseña ha sido cambiada correctamente')
                setError(false);
            }
            if(!show)setShow(true);
        }
        
        return(
            <form
            className="form-wrapper" 
            onSubmit={async (event) => { 
                        event.preventDefault();
                        await handleSubmit();
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

export default withRequest(ChangePassword);
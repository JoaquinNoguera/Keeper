import React from 'react';
import useInput from '../../utils/useInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SEND_EMAIL } from '../../utils/mutation';
import { setSuccessful, clearMessage, setError } from '../../redux/actions/authenticateActions';

const Forgot = ( props ) => {
    
    const { error, successful, clearMessage, setError, setSuccessful } = props;

    console.log(successful);
    const [ username,usernameInput ] = useInput(
        {
            type:"text",
            placeholder: "Correo electronico o nombre de usuario",
            required: true,
            className:"input-entry",
            init:""
        }
    );


    const handleSubmit = async () => {
        try{
            const response = await fetch('/api/',{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: SEND_EMAIL ,
                    variables: {
                        username
                    }
                })
            })
            const responseBody = await response.json();
            console.log(responseBody);
            if( responseBody.data.sendCodEmail )   
                setSuccessful( "El correo ha sido enviado exitosamente" )    
            else
                setError( "No se ha podido mandar el correo, por favor vuelve a intentarlo en unos minutos" );
                
        }catch( error){
            console.log( error );
        }

    }

    return(
        <div
        id="entry-container"
    >
        <div
            id="minimal-wrapper" 
            className="container"
        >
            <form 
                className="form-wrapper" 
                onSubmit={
                            (event) => { 
                                    event.preventDefault(); 
                                    handleSubmit().then();
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
                
                
                {
                        error.length 
                        && 
                        <div 
                        className="error-message"
                        >
                            { error[0].message }
                        </div>
                }

                {
                   !!successful
                    &&
                    <div 
                        className="successful-message"
                    >
                            { successful }
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
                    onClick={clearMessage}
                >
                    Iniciar sessión
                </Link>
                
                <p 
                    className="span-entry"
                >
                    No tienes cuenta
                </p>
                
                <Link 
                    to='/registrarse' 
                    className="link-entry account"
                    onClick={clearMessage}
                >
                    Crear cuenta
                </Link>

            </form>
        </div>
    </div>
    );
}

const mapDispatchToProps = dispatch => ({
    clearMessage: () => dispatch( clearMessage() ),
    setSuccessful: ( message ) => dispatch ( setSuccessful( message ) ),
    setError: ( message ) => dispatch ( setError( message ) )
    
        
});

const mapSatateToProps = props => ({
    error: props.authentication.error,
    successful: props.authentication.successful

});

export default connect( mapSatateToProps,mapDispatchToProps )( Forgot );
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auhtenticate, clearMessage } from '../../redux/actions/authenticateActions';
import useInput from '../../utils/useInput';

const Login = ( props ) => {
    
    const { error, authenticate, clearMessage } = props;
    
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
                        authenticate( username, password );
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
                        error.length 
                        && 
                        <div 
                        className="error-message"
                        >
                            { error[0].message }
                        </div>
                    }
            
                    { usernameInput }
            
                    { passwordInput }
                
                    <button 
                        type="submit" 
                        className="button-entry"
                    >
                        Acceder
                    </button>
            
                    <Link 
                        to="/solicitar-cod" 
                        className="link-entry link-small"
                        onClick={clearMessage}
                    >
                    ¿olvidaste la contraseña?
                    </Link>
            
                    <Link 
                        to="/recuperar"
                        className="link-entry forgot link-small"
                        onClick={clearMessage}
                    >
                        ¿Tenes un codigo de recuperación de contraseña?
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
                        Crear Cuenta
                    </Link>
                </form>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    authenticate: ( username, password ) => auhtenticate( username, password )
                                                .then( data => dispatch( data ) ),
    clearMessage: () => dispatch( clearMessage() )
    
        
});

const mapSatateToProps = props => ({
    error: props.authentication.error
});


export default connect( mapSatateToProps , mapDispatchToProps )( Login );
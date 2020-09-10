import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearMessage, setError, singup } from '../../redux/actions/authenticateActions';
import useInput from '../../utils/useInput';

const SingIn = (props) => {

    const { error, singup, clearMessage, setError } = props;


    const [name, nameInput] = useInput(
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
                if( password === repeat ) 
                    singup( name, password, email );
                else 
                    setError( "Las contraseñas no iguales" )
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

            {nameInput}

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
                onClick={ clearMessage }
                >
                Iniciar sessión
            </Link>
            </form>
        </div>
    </div>  
    ); 
}

const mapSatateToProps = props => ({
    error: props.authentication.error
});

const mapDispatchToProps = dispatch => ({
    singup: ( name, password, email ) => singup( name, password, email )
                                            .then( data => {
                                                dispatch( data );
                                            }),
    clearMessage: () => dispatch( clearMessage() ),
    setError: ( message ) => dispatch( setError( message ) )
    
        
});

export default connect( mapSatateToProps, mapDispatchToProps )( SingIn );
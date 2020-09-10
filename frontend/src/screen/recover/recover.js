import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import useInput from '../../utils/useInput';
import { clearMessage, setCod, setError, changePassword } from '../../redux/actions/authenticateActions';

const Recover = ( props ) => {
    
    const { error, cod, clearMessage, setCode, setError, changePassword, successful } = props;

    const [code,codeInput] = useInput(
        {
            type:"text",
            placeholder: "Codigo de recuperación",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [password , passwordInput] = useInput(
        {
            type:"password",
            placeholder: "Ingrese la nueva contraseña",
            required: true,
            className:"input-entry",
            init:""
        }
    );

    const [repeat,repeatInput] = useInput(
        {
            type:"password",
            placeholder: "Repita la contraseña",
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
                onSubmit={(event) => { 
                            event.preventDefault();
                            if ( cod ) {
                                if( password !== repeat )
                                    setError( "Las contraseñas no pueden ser distintas ");
                                else    
                                    changePassword( cod, password )
                            } else {
                                setCode( code );
                            }
            
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


                 {
                    ( cod ) ? (
                        <>
                        { passwordInput }
                        { repeatInput }
                        </>
                    ) : (
                        codeInput
                    )
                 }   
            
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
                    onClick={ clearMessage }
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
                    onClick={ clearMessage }
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
    setCode: ( code ) => setCod( code )
                            .then( data => dispatch( data ) ),
    setError: ( message ) => dispatch( setError( message ) ),
    changePassword: ( password, code ) => changePassword( password, code )
                                            .then( data => dispatch( data ) )  
    
        
});

const mapSatateToProps = props => ({
    error: props.authentication.error,
    cod: props.authentication.cod,
    successful: props.authentication.successful
});


export default connect( mapSatateToProps, mapDispatchToProps )( Recover );
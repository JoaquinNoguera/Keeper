import React,{useState} from 'react';
import useInput from '../../../hooks/useInput';
import Modal from '../../../component/modal';
import withRequest from '../../../Hocs/graphqlRequest';
import './style.scss';

function Config(props){
    
    const { name , email, mutation } = props;

    const [newPassword,newPasswordInput] = useInput(
        {
            type:"password",
            placeholder:"Nueva contraseña",
            required: true,
            className:"input-config",
            init:""
        }
    );

    const [repeat,repeatInput] = useInput(
        {
            type:"password",
            placeholder:"Repetir contraseña",
            required: true,
            className:"input-config",
            init:""
        }
    );

    const [password,passwordInput] = useInput(
        {
            type:"password",
            placeholder:"Contraseña actual",
            required: true,
            className:"input-config",
            init:""
        }
        );
        
    const [showModal, setShowModal] = useState(false);
    
    const [showMessage, setShowMessage] = useState(false);

    const[message, setMessage] = useState('')

    const [error, setError] = useState(false);

    const changePassword = async () => {
        setShowModal(false);
        const [data,response] = await mutation('CHANGE_PASSWORD',{
                                                            newPassword: newPassword,
                                                            repeat: repeat,
                                                            oldPassword: password,
                                                                }
                                            )
        if(!data) {
            setMessage(response);
            setError(true);
            setShowMessage(true);
        }else{
            setMessage('La contraseña ha sido cambiada correctamente');
            setShowMessage(true);
            setError(false);
        }
    }

    
    return(
        <div id="config-container">
            <div>
                <h2>Datos de la cuenta</h2>
                <p> 
                    <b>
                        Nombre: 
                    </b> 
                    {' ' + name}

                </p>
                <p> 
                    <b>
                        Email: 
                    </b>
                     {' ' + email}
                </p>

                <hr/>
                <h2>
                    Cambiar contraseña
                
                </h2>

                {
                    showMessage 
                        &&
                    <h4 
                        className={(error) ? ('error-message') : ('successful-message')}
                    >
                        {message}
                    </h4>
                }


                <form
                    onSubmit={()=> {
                        event.preventDefault();
                        setShowModal(true);
                    }}
                >
                    {newPasswordInput}
                
                    {repeatInput}

                    <button 
                        type="submit"
                    > 
                        Cambiar
                    </button>
                </form>
            </div>
            
            <Modal
                className="modal-config"
                show={showModal}
                onFocusLoss={()=>{setShowModal(false)}}
            >
                <h3>
                    ¿Estas seguro que deseas cambiar la contraseña?
                </h3>
                {passwordInput}
                <div>
                    <button 
                        className="ok"
                        onClick={changePassword}
                    > 
                        Confirmar 
                    </button>
                    <button 
                        className="cancel"
                        onClick={()=> { setShowModal(false)}}
                    > 
                        Cancelar 
                    </button>
                </div>
            </Modal>
        </div>
    );
}



export default withRequest(Config);
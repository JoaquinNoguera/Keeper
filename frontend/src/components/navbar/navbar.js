import React from 'react';
import { svg } from '../../data';
import { withRouter } from 'react-router-dom';
import { logut } from '../../redux/actions/authenticateActions'; 
import { connect } from 'react-redux';
import './styles.scss';

const Navbar = ( props ) => {

    const [show,setShow] = React.useState(false);

    const { user, history, logout } = props;
    

    document.addEventListener('click', function(event) {
        if(event.target.id != 'open-dropdawn' && event.target.id != 'user-dropdawn'){
          document.getElementById('user-dropdawn').style.display = 'none';
        }else{
            document.getElementById('user-dropdawn').style.display = 'block';
        }
      });

    return(
            <>
            <div 
                id="navbar"
            >
                <button
                    onClick={
                        () => {history.push('/')}
                    }
                >
                    <h2>
                        Keeper
                    </h2>
                </button>

                <button 
                    id="open-dropdawn"
                    onClick={()=>{setShow( !show )}}
                >
                    { user.name }
                    <svg 
                        focusable={false} 
                        viewBox="0 0 24 24" 
                        aria-hidden={true} 
                        role="presentation"
                    >
                        <path
                            d={svg.ACCOUNT_CIRCLE}                    
                        />
                    </svg>
                </button>
            </div>
            <div 
                id="user-dropdawn" 
                className={(show) ? '':'hide'}
            >
                <ul>
                    <li>
                        <button
                            onClick={()=>{ 
                                            setShow(false);
                                            history.push('/config');
                                            
                                        }}
                        >
                            Configuración
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={ logout }
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
            </>
    );
}

const mapDispatchToProps = dispatch => ({
    logout: () => logut().then( data => dispatch( data ) )
        
});

const mapSatateToProps = props => ({
    user : props.authentication.user
});

export default connect( mapSatateToProps, mapDispatchToProps )( withRouter(Navbar) );
import React, {useState} from 'react';
import {svg} from '../../type';
import {withRouter} from 'react-router-dom';
import withRequest from '../../Hocs/graphqlRequest';
import AccessContext from '../../context/access';
import './style.scss';

function Navbar(props){
    const {history,name,mutation} = props;
    const [show,setShow] = useState(false);

    const closeSession = async () => {
        return await mutation('LOGOUT')
    }

    return(
        <AccessContext.Consumer>
        {(context) => 
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
            
                <a>
                    
                </a>
                <button 
                    onClick={()=>{setShow(!show)}}
                >
                    {name}
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
                            onClick={() => {
                                if(closeSession()){
                                    context.changeAccess(0);
                                }
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
            </>
        }
        </AccessContext.Consumer>
    );
}

export default withRequest(withRouter(Navbar));
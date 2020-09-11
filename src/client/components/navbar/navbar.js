import React, {useState, useEffect, useRef } from 'react';
import {svg} from '../../type';
import {withRouter} from 'react-router-dom';
import './style.scss';
import makeRequest from '../../utils/makeRequest';
import { LOGOUT } from '../../graphQL/querys'

function Navbar(props){
    const { history, name, setUser} = props;
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);
    const [show,setShow] = useState(false);

    const closeSession = async () => {
        await makeRequest({
            query : LOGOUT
        })
        setUser(null);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    const handleClickOutside = event => {
        if (    wrapperRef.current && 
                !wrapperRef.current.contains(event.target) &&
                buttonRef.current && 
                !buttonRef.current.contains(event.target)    
        )    setShow(false);
    }

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
            
                <a>
                    
                </a>
                <button 
                    ref={buttonRef}
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
                ref={wrapperRef}
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
                            onClick={ closeSession }
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
            </>
    );
}

export default withRouter(Navbar);
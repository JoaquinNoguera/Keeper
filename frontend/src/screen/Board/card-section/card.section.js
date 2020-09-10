import React, { useState } from 'react';
import { color,svg } from '../../../data';
import useInput from '../../../utils/useInput';
import Modal from '../../../components/modal';
import CreateNewSection from '../create-new-section';
import { Link } from 'react-router-dom';
import './styles.scss';

function CardSection(props){

    const { 
            title, 
            description, 
            colorName,
            path,
            className
    } = props;
    
    const[ showConfirm, setShowConfirm ] = useState(false);
    const[ showEdit, setEdit ] = useState(false);

    const [confirm,confirmInput] = useInput(
        {
            type:"text",
            placeholder:"Introduzca el nombre de la sección",
            required: true,
            className:"",
            init:""
        }
    );    
    
    return(
        <>
            <CreateNewSection
                showModal={showEdit}
                setShowModal={setEdit}
                titleOld={title}
                descriptionOld={description}
                colorOld={colorName}
                pathOld={path}
                edit={true}
            />
            
            <Modal
                show={showConfirm}
                onFocusLoss={()=>{ setShowConfirm(false)} }
                className="modalConfirm"
            >   
            
            <h2>¿Esta seguro que desea eliminar la sección {title}?</h2>
            
            <p>
                Por favor introduce el nombre de la sección para eliminarla. Al hacerlo
                se borraran todas las tarjetas que esta contiene
            </p>
            
                {confirmInput}
            
            <div style={{
                    display:"flex", justifyContent:'space-around'
            }}>
                <button 
                    className="ok"
                >
                    Confirmar
                </button>
                <button 
                    className="cancel"
                    onClick={()=>setShowConfirm(false)}
                >
                    Cancelar
                </button>
            </div>

        </Modal>
        <div 
            id="conteiner-cardSection"
            style={{border:`.2em solid ${color[colorName].section.primary}` }}
            className={'' + className}
        >
            <div className="options-container">
                    <button
                        style={{background: color[colorName].section.primary}}
                        onClick={()=>setEdit(true)}
                    >
                        <svg
                            focusable={false} 
                            viewBox="0 0 24 24" 
                            aria-hidden={true} 
                            role="presentation"
                        >
                            <path
                                d={svg['BORDER_COLOR_ICON']}
                            />
                        </svg>
                    </button>
                    
                    <button
                        style={{background: color[colorName].section.primary}}
                        onClick={()=>{setShowConfirm(true)}}
                    >
                        <svg
                            focusable={false} 
                            viewBox="0 0 24 24" 
                            aria-hidden={true} 
                            role="presentation"
                        >
                            <path
                                d={svg['DELETE']}
                            />
                        </svg>
                    </button>
            </div>

             <svg
                style={{fill:color[colorName].section.icon}} 
                focusable={false} 
                viewBox="0 0 24 24" 
                aria-hidden={true} 
                role="presentation"
             >
                 <path
                    d={svg[path]}
                />
             </svg>
            <h1
                style={{color:color[colorName].section.primary}}
            >
                {
                    (title === "") 
                        ? 
                            "Titulo" 
                                : 
                            title
                }
            </h1>
            <p>
                { description }
            </p>
            <Link to={"/board/"+title}>
            <button
                style={{background:color[colorName].section.primary}}
                > 
                Ver pizzarra
            </button>
            </Link>
        </div>
        </>
    );
}

export default CardSection;
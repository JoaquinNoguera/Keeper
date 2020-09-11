import React,{ useState, useEffect } from 'react';
import { color, svg } from '../../../../type';
import useInput from '../../../../components/useInput';
import Modal from '../../../../components/modal';
import CreateNewSection from '../createNewSection';
import { Link } from 'react-router-dom';
import makeRequest from '../../../../utils/makeRequest';
import { DELETE_SECTION } from '../../../../graphQL/querys';
import './style.scss';

function CardSection(props){

    const { 
        title,
        description,
        colorName,
        path,
        className,
        setSections
    } = props;
    
    const[showConfirm,setShowConfirm] = useState(false);
    const[showEdit,setEdit] = useState(false);
    const[error,setError] = useState(false);
    const[message,setMesage] = useState("");



    const [confirm,confirmInput] = useInput(
        {
            type:"text",
            placeholder:"Introduzca el nombre de la sección",
            required: true,
            className:"",
            init:""
        }
    );

    const deleteThis = async () => {
        
        const { error, response } = await makeRequest({
            query: DELETE_SECTION,
            variables: {
                title
            }
        });

        if( response ){
            setShowConfirm(false);
            setSections( response.deleteSection.user.section );
        }else{
            setMesage( error[0].message );
            setError(true);
        }
    }

    
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
                setSections={setSections}
            />
        <Modal
            show={showConfirm}
            onFocusLoss={()=>{setShowConfirm(false)}}
            className="modalConfirm"
        >   
            <h2>¿Esta seguro que desea eliminar la sección {title}?</h2>
            <p>
                Por favor introduce el nombre de la sección para eliminarla. Al hacerlo
                se borraran todas las tarjetas que esta contiene
            </p>
            {confirmInput}
            {
                    error
                        &&
                    <h4 
                        className='error-message'
                    >
                        {message}
                    </h4>
            }
            <div style={{
                    display:"flex", justifyContent:'space-around'
            }}>
                <button 
                    className="ok"
                    onClick={async ()=>{
                        if(confirm.toUpperCase() === title.toUpperCase()){
                            await deleteThis();
                        }else{
                            setMesage('El titulo no es el correcto');
                            setError(true);
                        }
                    }}
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
import React, {useState} from 'react';
import Modal from '../../../../components/modal';
import useInput from '../../../../components/useInput';
import useTextArea from '../../../../components/useTextArea';
import GaleryIcon from '../../../../components/galeryIcon';
import {color} from '../../../../type'
import CardModal from '../cardSection';
import makeRequest from '../../../../utils/makeRequest';
import { EDIT_SECTION, CREATE_SECTION } from '../../../../graphQL/querys';
import './style.scss'

function CreateNewSection(props){
    const {
        showModal, 
        setShowModal,
        titleOld,
        descriptionOld,
        colorOld,
        pathOld, 
        edit,
        setSections} = props;

    const [title,titleInput] = useInput(
        {
            type:"text",
            placeholder:"Ingrese el titulo",
            required: true,
            className:"",
            init: titleOld
        }
    );

    
    const [colorName, setColorName] = useState(colorOld);

    const [path,setPath] = useState(pathOld);
    const [description,descriptionTextArea] = useTextArea({
        placeholder: "Ingrese la descripcion",
        init: descriptionOld
    });

    const [error,setError] = useState(false);
    const [message, setMessage] = useState("");


    let colorList = [];

    for(const c in color){
        colorList.push(
            <button
                className="colorButton"
                onClick={()=>{setColorName(c)}}
                key={c}
                style={{background:color[c].section.primary}}
            />
        )
    }
    const onSubmit = async () => {
        if(edit){
            const { error, response } = await makeRequest({
                query: EDIT_SECTION,
                variables: {
                    color:colorName,
                    icon: path,
                    title,
                    description,
                    oldTitle: titleOld
                }});


            if( response ){
                        setShowModal(false);
                        setSections(response.editSection.user.section)
                    }else{
                        setMessage(error[0].message);
                        setError(true);
                    }
            }else{
            const { response, error } = await makeRequest({
                query: CREATE_SECTION,
                variables: {
                    color:colorName,
                    icon: path,
                    title,
                    description
                }});
            if( response ){
                setSections(response.createSection.user.section)
                setShowModal(false);
            }else{
                setMessage(error[0].message);
                setError(true);
            }
        }
    }

    return(
        <Modal
            id="modal-new"
            show={showModal}
            onFocusLoss={()=>{setShowModal(false)}}
        >
            <div
                className="modal-newSection"
            >
            <div
                className="content-container"
            >
                <h2> 
                    Titulo
                </h2>

                {titleInput}
                
                <h2>
                    Descripción
                </h2>

                {descriptionTextArea}

                <h2>
                    Color
                </h2>
                <div>
                    {colorList}
                </div>
                <h2>
                    Icono
                </h2>
                <GaleryIcon
                    width="auto"
                    height="7em"
                    setPath={setPath}
                />
                
            </div>
            <CardModal
                title={title}
                description={description}
                colorName={colorName}
                path={path}
                className="noClick"
            />
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
                        {
                            (error) ? 
                            <div 
                            className="error-message"
                            >
                            {message}
                            </div> : null
                        }
        
        <div
            className="option-container"
        >
            <button 
                className="ok"
                onClick={onSubmit}
            > 
                {(edit) ? ('Guardar') : ('Crear')} 
            </button>
            
            <button 
                className="cancel"
                onClick={()=> { 
                    setError(false);
                    setShowModal(false);
                }
                }
            > 
                Cancelar 
            </button>
        </div>
        </div>
        </Modal>
    );
}

export default CreateNewSection;
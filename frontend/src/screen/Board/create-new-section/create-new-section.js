import React, {useState} from 'react';
import Modal from '../../../components/modal';
import useInput from '../../../utils/useInput';
import useTextArea from '../../../utils/useArea';
import GaleryIcon from '../../../components/galery-icon';
import { color } from '../../../data';
import CardModal from '../card-section';
import './styles.scss'

function CreateNewSection(props){
    const {showModal, setShowModal,titleOld,descriptionOld,colorOld,pathOld, edit } = props;

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
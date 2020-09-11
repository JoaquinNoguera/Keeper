import React, {useState} from 'react';
import Modal from '../../../../components/modal';
import useInput from '../../../../components/useInput';
import useTextArea from '../../../../components/useTextArea';
import {svg,color} from '../../../../type';
import makeRequest from '../../../../utils/makeRequest';
import { CREATE_CARD, EDIT_CARD, DELETE_CARD } from '../../../../graphQL/querys';


function EditCard(props){

    const { 
            add, 
            oldTitle, 
            oldDescription, 
            oldColorName, 
            showModal, 
            setShowModal, 
            section, 
            setCards 
    } = props;
    
    const [edit,setEdit] = useState(false);
    
    const [colorName,setColorName] = useState(oldColorName);
    
    const [editColor,setEditColor] = useState(false);

    const[message, setMessage] = useState("");

    const[error,setError] = useState(false);

    const [title,newTitleInput] = useInput(
        {
            type:"text",
            placeholder:"Title",
            required: true,
            className:"",
            init: oldTitle
        }
    );

    const [description,descriptionTextArea] = useTextArea({
        placeholder: "Description",
        init: oldDescription
    });

    let colorList = [];

    for(const c in color){
        colorList.push(
            <button
                className="colorButton"
                onClick={()=>{setColorName(c)}}
                key={c}
                style={{background:color[c].card}}
            />
        )
    }
    
    const createCard = async () => {
        const { response, error } = await makeRequest({
            query: CREATE_CARD,
            variables:{
                title: title, 
                description: description ,
                color: colorName,
                 section: section
            }
        });
        if(response){
            setCards(response.createCard);
            setShowModal(false);
        }else{
            setMessage(error[0].message);
            setError(true);
        }
    }

    const deleteCard = async () => {
        const { response, error } = await makeRequest({
            query: DELETE_CARD,
            variables: {
                card: title, 
                section: section
            }
        });

        if(response){
            setCards(response.deleteCard);
        }else{
            setMessage(error[0].message);
            setError(true);
        }
    }

    const editCard = async () => {
        const { response, error } = await makeRequest({
            query: EDIT_CARD,
            variables: {
                card: oldTitle, 
                section: section, 
                title: title, 
                description: description, 
                color: colorName
            }
        });

        if(response){
            setEdit(false);
            setCards(response.editCard);
        }else{
            setMessage(error[0].message);
            setError(true);
        }
    }

    return(
        <Modal
        show={showModal}
        onFocusLoss={()=>{
            setEdit(false);
            setShowModal(false);
        }}
        style={{background: color[colorName].card}}
        className="cardEdit"
        >
        {
            (edit || add) ?
        <div 
            className="optionsCard"
        >
            <div className={(editColor) ? '' : 'hide'}>
                {colorList}
            </div>
            <button 
                id="editColor"
                onClick={()=>setEditColor(!editColor)}
            >
                      <svg 
                    focusable={false} 
                    viewBox="0 0 24 24" 
                    aria-hidden={true} 
                    role="presentation"
                >
                    <path
                        d={svg['PALLETE']}
                    />
                </svg>
            </button>
        </div> : null
        }
        <div
            className="titleContainer"
        >
            {
                (edit || add) 
                    ?  
                    newTitleInput 
                    : 
                    <h1>
                        {title}
                    </h1>
            }
        </div>
        <div className="descriptionContainer">
        {
                (edit || add) 
                    ?  
                    descriptionTextArea 
                    : 
                <p>
                    {description}
                </p>
        }
        
        </div>
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
                  
        {
            (add) ? (
            <>
                <button 
                    className="ok"
                    onClick={createCard}
                > 
                    Crear
                </button>
            
                <button 
                className="cancel"
                onClick={()=> { 
                    setError(false);
                    setShowModal(false);
                }}
                > 
                    Cancelar
                </button>    
            </>
            ) : 
            ( (edit) 
                    ? 
                    (
                        <>
                <button 
                    className="ok"
                    onClick={()=>{
                        setEdit(false);
                        editCard();
                    }}
                > 
                    Guardar
                </button>
            
                <button 
                    className="edit"
                    onClick={deleteCard}
                > 
                    Borrar
                </button>

                <button 
                    className="cancel"
                    onClick={()=> { 
                            setEdit(false);
                    }}
                > 
                    Cancel
                </button>
            </>
                    ) 
                    :
            <>
                <button 
                    className="edit"
                    onClick={()=>setEdit(!edit)}
                > 
                    Editar
                </button>
            
                <button 
                    className="ok"
                    onClick={()=> { 
                            setEdit(false);
                            setShowModal(false);
                    }}
                > 
                    Ok
                </button>
            </>
            )
        }
        </div>
     </Modal>
    );
}


export default EditCard;
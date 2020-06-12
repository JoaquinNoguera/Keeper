import React, {useState} from 'react';
import Modal from '../../../../component/modal';
import useInput from '../../../../hooks/useInput';
import useTextArea from '../../../../hooks/useTextArea';
import withRequest from '../../../../Hocs/graphqlRequest';
import {svg,color} from '../../../../type';

function EditCard(props){

    const { add, oldTitle, oldDescription, oldColorName, mutation, showModal, setShowModal, section, setCards } = props;
    
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
        const [data,response] = await mutation('CREATE_CARD',{
            title: title, description: description ,color: colorName, section: section
        })
        if(data){
            setCards(response);
            setShowModal(false);
        }else{
            setMessage(response);
            setError(true);
        }
    }

    const deleteCard = async () => {
        const [data,response] = await mutation('DELETE_CARD',{
            card: title, section: section            
        })
        if(data){
            setCards(response);
            setEdit(false);
            setShowModal(false);
        }else{
            setMessage(response);
            setError(true);
        }
    }

    const editCard = async () => {
        const [data,response] = await mutation('EDIT_CARD',{
            card: oldTitle, section: section, title: title, description: description, color: colorName
        })
        if(data){
            setCards(response);
            setShowModal(false);
        }else{
            setMessage(response);
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


export default withRequest(EditCard);
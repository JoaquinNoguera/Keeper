import React, {useState} from 'react';
import useInput from '../../../components/useInput';
import CreateNewSection from './createNewSection';
import CardSection from './cardSection'
import { svg } from '../../../type';
import './style.scss';

export default function Section(props){
    
   

    const {sections,setSections} = props;
    
    const [find,findInput] = useInput(
        {
            type:"text",
            placeholder:"Filtrar seccion",
            required: true,
            className:"rest",
            init:""
        }
    );

    const re = new RegExp(`(${find})`);
    
    const listSections = sections.map((s)=>{
        const {title, description, icon, color} = s;

        if(find === "" || title.search(re) !== -1){
            return <CardSection
                        key={title}
                        title={title}
                        description={description}
                        colorName={color}
                        path={icon}
                        setSections={setSections}
                    />
        }  
        return null;
    });
    
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
        <CreateNewSection
            showModal={showModal}
            setShowModal={setShowModal}
            titleOld=""
            descriptionOld=""
            colorOld="AMARILLO"
            pathOld="ATTACH_FILE_ICON"
            edit={false}
            setSections={setSections}
        />
    <div id="section-conteiner">
        
        <div className="menu">
            <button
                className="add"
                onClick={()=>{
                                setShowModal(true);
                            }
                        }
            >
                <svg 
                    focusable={false} 
                    viewBox="0 0 24 24" 
                    aria-hidden={true} 
                    role="presentation"
                >
                    <path
                        d={svg['ADD_CIRCLE_OUTLINE_ICON']}
                    />
                </svg>
                <p>
                    Nueva sección
                </p>
            </button>

 
            {findInput}
         

        </div>
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexWrap: 'wrap'
            }}
        >
            {listSections}
        </div>
    </div>
    </>);
}
import React from 'react';
import { connect } from 'react-redux';
import { svg } from '../../data';
import Navbar from '../../components/navbar';
import useInput from '../../utils/useInput';
import CardSection from './card-section';
import CreateNewSection from './create-new-section';

const Board = ( props ) => {

    const { sections } = props;

    const [ find, findInput ] = useInput(
        {
            type:"text",
            placeholder:"Filtrar seccion",
            required: true,
            className:"rest",
            init:""
        }
    );

    const re = new RegExp(`(${ find })`);
    
    const listSections = sections.map((s)=>{
        const {title, description, icon, color} = s;

        if(find === "" || title.search(re) !== -1){
            return <CardSection
                        key={ title }
                        title={ title }
                        description={ description }
                        colorName={ color }
                        path={ icon }
                    />
        }  
        return null;
    });
    
    const [showModal, setShowModal] = React.useState( false );



    return(
        <>
            <Navbar/>
            
            <CreateNewSection
                showModal={ showModal }
                setShowModal={ setShowModal }
                titleOld=""
                descriptionOld=""
                colorOld="AMARILLO"
                pathOld="ATTACH_FILE_ICON"
                edit={ false }
            />
   
             <div id="section-conteiner">
        
                <div className="menu">
                    <button
                        className="add"
                        onClick={()=>{
                                        setShowModal( true );
                                    }
                                }
                    >
                        <svg 
                            focusable={ false } 
                            viewBox="0 0 24 24" 
                            aria-hidden={ true } 
                            role="presentation"
                        >
                            <path
                                d={svg['ADD_CIRCLE_OUTLINE_ICON']}
                            />
                        </svg>
                        
                        <p> Nueva sección </p>
                    </button>

 
                    { findInput }
         
                </div>
                
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexWrap: 'wrap'
                    }}
                >
                    { listSections }

                </div>
            </div>
        </>
    );
}

const mapSatateToProps = props => ({
    sections: props.section.sections
});


export default connect( mapSatateToProps ) ( Board );
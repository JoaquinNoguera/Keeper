import React, {useState} from 'react';
import useInput from '../../../hooks/useInput';
import withRequest from '../../../Hocs/graphqlRequest';
import EditCard from './editCard';
import Card from './Card';
import Loading from '../../../component/loading';
import {withRouter} from 'react-router-dom';
import {svg} from '../../../type';
import './style.scss';

function SectionBoard(props){
    
    const {querys} = props;
    
    const section = props.match.params.section;
    
    const[showModal,setShowModal] = useState(false);

    const [find,findInput] = useInput(
        {
            type:"text",
            placeholder:"Filtrar notas",
            required: true,
            className:"rest",
            init:""
        }
    );
 
    const [data,loading] = querys('GET_CARDS',{
        section
    });
    
    const[cards,setCards] = useState(null);

    if(loading) return  <div className="center">
                            <Loading/>
                        </div>
    else{

    if(!cards) setCards(data.getCards);
        
  
    const re = new RegExp(`(${find})`);
   
    const ListCards = (!cards) ? null : cards.map(card => {
        
        const {title,description,color} = card
        if(find === "" || title.search(re) !== -1){

            return <Card
            key={title}
            title={title}
            description={description}
            colorName={color}
            setCards={setCards}
            section={section}
            />;
        }
    });

    return(
        <>
        <EditCard
            showModal={showModal}
            setShowModal={setShowModal}
            add = { true }
            oldColorName = {'AMARILLO'}
            oldTitle = {''}
            oldDescription = {''}
            section = {section}
            setCards = {setCards}
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
                    Nueva Nota
                </p>
            </button>

 
            {findInput}
        </div>
        <div
            id="titleBoard"
        >
            <h1>
                {section}
            </h1>
        </div>
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'strech',
                flexWrap: 'wrap'
            }}
        >
            {ListCards}
        </div>
    </div>
    </>
    )
}}

export default withRequest(withRouter(SectionBoard));
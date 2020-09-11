import React, { useState, useEffect } from 'react';
import useInput from '../../../components/useInput';
import EditCard from './editCard';
import Card from './Card';
import Loading from '../../../components/loading';
import { withRouter } from 'react-router-dom';
import { svg } from '../../../type';
import makeRequest from '../../../utils/makeRequest';
import { GET_CARDS} from '../../../graphQL/querys';
import './style.scss';

function SectionBoard(props){
    
    const section = props.match.params.section;
    const { history } = props;

    const[showModal,setShowModal] = useState(false);
    const [loading, toogleLoading ] = useState(true);
    const[cards,setCards] = useState([]);
    const [find,findInput] = useInput(
        {
            type:"text",
            placeholder:"Filtrar notas",
            required: true,
            className:"rest",
            init:""
        }
    );
 
    const getCards = async () => {
        const { response, error } = await makeRequest({
            query: GET_CARDS,
            variables: {
                section
            }
        });

        if(response){
            setCards(response.getCards)
            toogleLoading( false );
        }else{
            history.push('/')
        }
    }

    useEffect(() => {
        getCards();
    },[])
    
  

    if( loading ) return  <div className="center">
                            <Loading/>
                        </div>
    else{

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

export default withRouter(SectionBoard);
import React, { useState } from 'react';
import { color } from '../../../../type';
import EditCard from '../editCard';
import './style.scss';

function Card(props){
    
    const {
        title,
        colorName,
        description,
        setCards,
        section
    } = props;
    
    const [ showModal, setShowModal] = useState(false);
    
    return(
        <>
        <EditCard
            showModal={showModal}
            setShowModal={setShowModal}
            add = { false }
            oldColorName = {colorName}
            oldTitle = {title}
            oldDescription = {description}
            section = {section}
            setCards = {setCards}
        />
        <div
            id="noteContainer"
            style={{background:color[colorName].card}}
            onClick={()=>setShowModal(true)}
        >
            <h1>
                {title}
            </h1>
            <p>
                {description}
            </p>
        </div>
        </>
    );
}

export default Card;
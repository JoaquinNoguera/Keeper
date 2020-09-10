import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default function(){
    return(
        <div id="notFound-container">  
            <h1>
                Ups!
            </h1>
            <h2> 
                La pagina que usted ha buscado no se ha encontrado.
            </h2>
            <Link 
                to="/"
            >
                volver al inicio
            </Link>
        </div>
    )
}
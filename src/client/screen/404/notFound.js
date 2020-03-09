import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default function NotFound(){
    return(
        <div id="notFound-container">  
            <h1>
                404!
            </h1>
            <h2> 
                Ups!, la pagina que usted ha buscado no se ha encontrado.
            </h2>
            <Link 
                to="/"
            >
                volver al inicio
            </Link>
        </div>
    )
}
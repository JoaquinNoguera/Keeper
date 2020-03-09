import React from 'react';
import './style.scss';
export default function ServerUnavailable(){

    return(
        <div id="serverUnavailable-container">
            <h1>
                504!
            </h1>
            <h2>
                Ups!, el server no esta disponible temporalmente,
                por favor intenta recargar la pagina en unos minutos
            </h2>
        </div>
    );

}
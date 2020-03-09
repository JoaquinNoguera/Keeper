import React from 'react';
import {svg} from '../../type';
import './style.scss';

export default function GaleryIcon(props){
    let iconList = [];
    const {width, height,setPath} = props;
    
    for(const icon in svg){
        iconList.push(
            <button
                key={icon}
                onClick={()=>{setPath(icon)}}
            >
                <svg 
                    focusable={false} 
                    viewBox="0 0 24 24" 
                    aria-hidden={true} 
                    role="presentation"
                >
                    <path
                        d={svg[icon]}
                    />
                </svg>
         </button>
        )
    }
    
    return(
        <div
            id="galery-container"
            style={{width:width,height:height,minHeight:height}}
        >
            {iconList}
        </div>
    );
}
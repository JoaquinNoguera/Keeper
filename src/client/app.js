import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Protected from './routes/protected';
import "@babel/polyfill";
import './style.scss';

function App(){
    return(
        <BrowserRouter>
            <Protected/>    
        </BrowserRouter>
    );
}



ReactDOM.render(
        <App/>, 
document.getElementById('app'));
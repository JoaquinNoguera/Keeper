import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import Protected from './routes/protected';
import client from './apollo';
import NotFound from './screen/404';
import "@babel/polyfill";
import './style.scss';

function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Protected/>    
            </Switch>
        </BrowserRouter>
    );
}



ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>, 
document.getElementById('app'));
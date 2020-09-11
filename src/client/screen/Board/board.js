import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Section from './section'
import Loading from '../../components/loading';
import Config from './Config';
import SectionBoard from './sectionBoard';
import NotFound from '../404';
import { Route,Switch } from 'react-router-dom';


function Board({ user, setUser }){
    
    if( user ){
    const { name, email, section } = user;
    const[sections,setSections] = useState( section );
    
    return(
        <>
            <Navbar
                name={name}
                setUser={setUser}
            />
            <Switch>
            <Route
                exact path = '/'
            >
                <Section
                    user = {user}
                    sections = {sections}
                    setSections = {setSections}
                />
            </Route>
            <Route
                exact path='/config'
            >
                <Config
                    name={name}
                    email={email}
                />
            </Route>
            <Route
                exact path='/board/:section'
            > 
                <SectionBoard/>
            </Route>
            <Route
                component={NotFound}
            />
            </Switch>
        </>);
        }else{
             return (
                 <div className="center" >
                     <Loading/>
                 </div>
             );
        }
    }

export default Board;
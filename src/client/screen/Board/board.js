import React, {useState} from 'react';
import Navbar from '../../component/navbar';
import Section from './section'
import Loading from '../../component/loading';
import withRequest from '../../Hocs/graphqlRequest';
import Config from './Config';
import SectionBoard from './sectionBoard';
import NotFound from '../404';
import { Route,Switch } from 'react-router-dom';

function Board(props){
    
    const {querys} = props;

    
    const [data,loading] = querys('GET_CURRENT_USER');
    const[sections,setSections] = useState(null);

    if(loading) return  <div className="center">
                            <Loading/>
                        </div>
    else{
        const {name, email,section} = data.currentUser.user;
        if(!sections) setSections(section);
    return(
        <>
            <Navbar
                name={name}
            />
            <Switch>
            <Route
                exact path = '/'
            >
                <Section
                    user = {data.currentUser.user}
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
    }
}

export default withRequest(Board)
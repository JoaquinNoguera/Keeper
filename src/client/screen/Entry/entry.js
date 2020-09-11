import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import SingIn from './singin';
import SingUp from './singup';
import Forgot from './forgot';
import Recover from './recover';
import ChangePassword from './recover/changePassword';
import './style.scss';

export default function Entry( { setUser }){
    return(
        <div 
            id="entry-container"
        >
            <div 
                id="minimal-wrapper" 
                className="container"
            >
                <Switch>
                    
                    <Route 
                        exact path="/" 
                    >
                        <SingIn
                            setUser={setUser}
                        />
                    </Route>
                    
                    <Route  
                        exact path="/singup" 
                    >
                            <SingUp
                            setUser={setUser}
                            />
                    </Route>
                    
                    <Route 
                        exact path="/forgot" 
                        component={Forgot}
                    />
                    
                    <Route 
                        exact path="/recover" 
                        component={Recover}
                    />
                    <Route
                        exact path='/recover/:code'
                        component={ChangePassword}
                    />
                                         
                    <Route>
                        <Redirect to="/"/>
                    </Route>
                
                </Switch>
            
            </div>
        
        </div>
    );
}
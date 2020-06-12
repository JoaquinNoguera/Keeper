import React from 'react';
import AccessContext from '../context/access';
import Entry from '../screen/Entry';
import Welcome from '../screen/welcome';
import Board from '../screen/Board';
import {access} from '../type';

export default function Rutes(props){
    const {userAccess,setUserAccess} = props;
    const {UNKNOWN,AUTHENTICATE,AUTHORIZE} = access;

    switch(userAccess){
            case UNKNOWN:{
                return <AccessContext.Provider value={{
                    access: userAccess,
                    changeAccess: setUserAccess,
                }}>
                            <Entry/>
                        </AccessContext.Provider>
            }
            case AUTHENTICATE: {
                return <AccessContext.Provider value={{
                    access: userAccess,
                    changeAccess: setUserAccess,
                }}>
                                <Entry/>
                        </AccessContext.Provider>
            }
            case AUTHORIZE: {
                return <AccessContext.Provider value={{
                    access: userAccess,
                    changeAccess: setUserAccess,
                }}>
                                <Board/>
                        </AccessContext.Provider>
            }
        }
}
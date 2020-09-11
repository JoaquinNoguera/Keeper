import React,{useEffect, useState} from 'react';
import makeRequest from '../utils/makeRequest';
import { GET_CURRENT_USER } from '../graphQL/querys';
import Loading from '../components/loading';
import Entry from '../screen/Entry';
import Board from '../screen/Board';

function Protected(){

    const [loading,toogleLoading] = useState(true);
    const [ user, setUser] = useState(null);
    
    const getCurrentUser = async () => {
        const { response, error } = await makeRequest( { query: GET_CURRENT_USER } )
        if( response ){
            setUser(response.currentUser.user)
        }
        toogleLoading(false);
    }


    useEffect( () =>{
        getCurrentUser();
    },[]);

    if( loading ){
        return  <div className="center">
                     <Loading/>
                </div>
    }else{
        if( user ){
            return <Board
                        user={ user }
                        setUser={setUser}
                    />
        }else{
            return <Entry setUser={setUser} />
        }
    }


    return <Board/>;

}

export default Protected;
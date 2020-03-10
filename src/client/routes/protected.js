import React,{useEffect, useState} from 'react';
import withRequest from '../Hocs/graphqlRequest';
import Loading from '../component/loading';
import Routes from './routes'
import ServerUnavailable from '../screen/504';


function Protected(props){
    
    const {querys} = props;
    
    const [data,loading,error] = querys('GET_ACCESS_USER');
    
    const [userAccess,setUserAccess] = useState(null);

    useEffect(() => {
        if(!loading && data) {
            setUserAccess(data.getAccessUser)
        }

    }, [loading]);
    
    if(error === 'Server dont respond') return <ServerUnavailable />

    if(userAccess === null){
    
        return <div className="center">
                    <Loading/>
                </div>}
    
    else{

        return <Routes 
                        userAccess={userAccess} 
                        setUserAccess={setUserAccess}
                />;
    
    }
}

export default withRequest(Protected);
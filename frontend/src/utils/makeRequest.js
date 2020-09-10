const makeRequest = async( { actionPass, actionError, query, variables = {} }) => {
    try{
        const response = await fetch('/api/',{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        });
        
        const responseBody = await response.json();
        
        if( !!responseBody.errors ) throw responseBody.errors;
        return {type: actionPass, payload: responseBody };
    }catch(error){
        return {type: actionError, payload: { error }};
    }
}

export default makeRequest;
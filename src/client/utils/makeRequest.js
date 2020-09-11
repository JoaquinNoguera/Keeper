const makeRequest = async( { query, variables = {} }) => {
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
        return {
            response: responseBody.data,
            error: null 
        };
    }catch(error){
        return {
            response: null,
            error: error 
        }
    }
}

export default makeRequest;
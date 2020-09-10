

const defaultState = {
    sections: [],
    error: false,
    loading: true,
    successful: false,
};


const sectionReducer = ( state = defaultState, { type, payload } ) => {
    switch( type ){
        default: {
            return state;
        }
    }
}

export default sectionReducer;
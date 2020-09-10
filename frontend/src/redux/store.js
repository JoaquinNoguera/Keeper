import { createStore, combineReducers, applyMiddleware } from 'redux';
import authenticationReducer from './reducers/authenticationReducer';
import sectionReducer from './reducers/sectionReducer';
import thunk from 'redux-thunk';


const reducer = combineReducers({
    authentication: authenticationReducer,
    section: sectionReducer
});

const store = createStore( reducer, applyMiddleware( thunk ) );

export default store;
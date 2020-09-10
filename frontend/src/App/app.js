import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { authenticateMe } from '../redux/actions/authenticateActions';
import { connect } from 'react-redux'
import Login from '../screen/login';
import Singup from '../screen/singup';
import Loading from '../components/loading';
import NotFound from '../screen/not-found';
import Forgot from '../screen/forgot';
import Recover from '../screen/recover';
import Board from '../screen/board';
import './styles.scss'
class App extends React.Component {
        
    componentDidMount(){
        this.props.authenticateMe();
    }

    componentDidUpdate( prevProps ){
        if(this.props.logedIn !== prevProps.logedIn){
            this.props.authenticateMe();
        }
    }

    render(){
        const { logedIn, loading } = this.props;

        if( loading ) return <Loading/>;

        return(
            <BrowserRouter>
                <Switch>
                    {
                        (logedIn) ?
                        (
                            <Route exact path="/">
                                <Board/>
                            </Route>
                        ) : (
                            <Switch>
                                <Route exact path="/registrarse" component={ Singup } />
                                <Route exact path="/solicitar-cod" component= { Forgot } />
                                <Route exact path="/recuperar" component={ Recover } />
                                <Route component={ Login }/>
                            
                            </Switch>
                        )
                    }
                    <Route component={ NotFound }/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapSatateToProps = props => ({
    logedIn: props.authentication.logedIn,
    loading: props.authentication.loading
});

const mapDispatchToProps = dispatch => ({
        authenticateMe: () => authenticateMe()
                                .then( data => dispatch( data ))
});

export default connect(mapSatateToProps,mapDispatchToProps)(App);
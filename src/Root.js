import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import { connect } from './connect'
import { Provider } from 'react-redux'
import store from './redux/create-store'
import PrivateRoute from './PrivateRoute'
import App from './App';

class Root extends React.Component {
    render(){
return(
    <Router>
         <Provider store={store}>
            <div>
                <Switch>
                    {/* <PrivateRoute path="/"  exact={true} component={App} /> */}
                    {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />         */}
                    {/* <Route path="/app" component={App} /> */}
                    {/* <Route path="/404" component={NotFound} /> */}
                    <Route path="/login" component={Login} />
                    <Redirect from='*' to='/' />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </div>
         </Provider>
    </Router>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        alertMsg: state.getIn(['utilsReducer', 'alertMsg']),
        isLoading: state.getIn(['utilsReducer', 'isLoading']),
    }
};


export default connect(mapStateToProps)(Root);
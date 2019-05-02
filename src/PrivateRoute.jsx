import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './components/pages/Login';
import PropTypes from 'prop-types';
import { connect } from './connect'

//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: props.currentUser != null
        }
    }


    render() {
        let { component: Component, path = "/", exact = false, strict = false } = this.props;
        return this.state.isAuthenticated ? (
            <Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)} />
        ) : (<Route path="/login"  component={Login} />);
    }
}

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    component: PropTypes.func.isRequired
}
const mapStateToProps = (state, props) => {
    return {
        currentUser: state.getIn(['userReducer', 'currentUser']),
    }
}
const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute)
export default withRouter(ConnectedPrivateRoute);


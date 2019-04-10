import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from './connect'

//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: props.AuthCheckResult
        }
    }

    componentDidMount() {
        // let isAuthenticated = this.props.AuthCheckResult;
        // this.setState({ isAuthenticated: isAuthenticated })
        // if (!isAuthenticated) {
        //     const { history } = this.props;
        //     setTimeout(() => {
        //         history.replace("/agilean_login");
        //     }, 1000)
        // }
    }
    componentWillReceiveProps(nextProps){
        // this.setState({ AuthCheckResult: nextProps.AuthCheckResult })
        // if (!nextProps.AuthCheckResult) {
        //     const { history } = this.props;
        //     setTimeout(() => {
        //         history.replace("/agilean_login");
        //     }, 1000)
        // }
    }

    render() {
        let { component: Component, path = "/", exact = false, strict = false } = this.props;
        // return this.state.isAuthenticated ? (
            return <Route path={path} exact={exact}  strict={strict} render={(props) => (<Component {...props} />)} />
        // ) : ("请重新登录");
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
        AuthCheckResult: state.getIn(['utilsReducer', 'AuthCheckResult']),
    }
}
const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute)
export default withRouter(ConnectedPrivateRoute);


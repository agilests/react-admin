import React, { Component } from 'react';
import { Table, Button, Modal,Input } from 'antd';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';

class Station extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Input/>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        // errorMsg: state.getIn(['orgReducer', 'errorMsg']),
        // accounts: state.getIn(['orgReducer', 'accounts'], []),
        // fetching: state.getIn(['orgReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // fetchAccounts: (orgId) => {
        //     dispatch(fetchAccounts(orgId))
        // },
        // register: (orgId, account) => {
        //     dispatch(createAccount(orgId, account))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Station)
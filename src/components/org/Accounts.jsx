import React from 'react';
import { Table, Icon, Button } from 'antd';
import {fetchAccounts} from '../../redux/org/orgActions';
import { connect } from '../../connect'

const columns = [{
    title: '名称',
    dataIndex: 'account',
    key: 'account',
    render: text => <span>{text}</span>,
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button>编辑 一 {record.name}</Button>
            <span className="ant-divider" />
            <Button>Delete</Button>
            <span className="ant-divider" />
        </span>
    ),
}];


class Accounts extends React.Component{
    constructor(props){
        super(props)
        this.props.fetchAccounts(this.props.query.org);
    }
    render(){
        let accounts = this.props.accounts;
        console.log(accounts);
        return  <Table columns={columns} dataSource={accounts} />
    }
}

    

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['orgReducer', 'errorMsg']),
        accounts: state.getIn(['orgReducer','accounts'],[]),
        fetching: state.getIn(['orgReducer','fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccounts: (orgId) => {
            dispatch(fetchAccounts(orgId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
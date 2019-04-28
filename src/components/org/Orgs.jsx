import React from 'react';
import { Table, Icon, Button } from 'antd';
import {fetchOrgs} from '../../redux/org/orgActions';
import { connect } from '../../connect'
import Accounts from './Accounts'
import { Route, Redirect,Link } from 'react-router-dom';
import BreadcrumbCustom from '../BreadcrumbCustom';

const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created',
    // render: text => <span>${new Date(text)}</span>
}, {
    title: '更新时间',
    dataIndex: 'lastModified',
    key: 'lastModified',
    // render: text => <span>${new Date(text)}</span>
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>

            <Link to={`/app/org/accounts?org=${record.id}`}>账号管理</Link>
            <Button onClick={()=>{
            }}>编辑</Button>
            <span className="ant-divider" />
            <Button>Delete</Button>
            <span className="ant-divider" />
        </span>
    ),
}];

// const data = [{
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
// }, {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
// }, {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
// }];



class Orgs extends React.Component{
    constructor(props){
        super(props)
        this.props.fetchOrgs();
    }
    componentDidUpdate(prevProps) { 
        console.log('in componentDidUpdate');
    }
    componentWillReceiveProps(nextProps){
        console.log('in componentWillReceiveProps');
    }
    render(){
        const orgs = this.props.orgs;
        return  (

            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="客户"/>
                <Table columns={columns} dataSource={orgs} />
            </div>
        )
    }
}

    

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['orgReducer', 'errorMsg']),
        orgs: state.getIn(['orgReducer','orgs'],[]),
        fetching: state.getIn(['orgReducer','fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orgs)
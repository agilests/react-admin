import React from 'react';
import { Table,Button,Modal } from 'antd';
import {fetchAccounts,createAccount} from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import CreateAccount from './CreateAccount';
const columns = [{
    title: '名称',
    dataIndex: 'account',
    key: 'account',
    render: text => <span>{text}</span>,
}, {
    title: '联系电话',
    dataIndex: 'contact',
    key: 'contact',
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
        this.state={
            create: true,
            modalVisible: false
        }
        this.props.fetchAccounts(this.props.query.org);
    }
    showCreate(){
        this.setState({create:true,modalVisible:true});
    }
    showEdit(record){
        this.setState({create:false,modalVisible:true});
    }
    register(){
        this.props.register(this.props.query.org,this.state);
        this.setState({modalVisible:false});
    }
    hiddenDialog(){
        this.setState({modalVisible:false});
    }

    valueChange = (prop) => (input) =>{
        this.setState({[prop]:input.target.value})
    }
    render(){
        let accounts = this.props.accounts;
        
        return  (

            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="客户" second="账户"/>
                <p>
                    <Button onClick={()=>this.showCreate()}>注册账户</Button>
                </p>
                <Table columns={columns} dataSource={accounts} />

                <Modal
                visible={this.state.modalVisible}
                title={this.state.create?'添加账户':'编辑'}
                okText={this.state.create?'注册':'保存'}
                onOk={() => this.register()}
                onCancel={() => this.hiddenDialog()}
                >
                <CreateAccount change={this.valueChange}/>
                </Modal>
            </div>
        )

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
        },
        register:(orgId, account) => {
            dispatch(createAccount(orgId, account))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
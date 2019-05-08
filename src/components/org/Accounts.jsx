import React from 'react';
import { Table, Button, Modal } from 'antd';
import { fetchAccounts, createAccount } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import CreateAccount from './CreateAccount';
import { success, error } from '../widget/Message';

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
            <Button onClick={() => this.showEdit(record)}>编辑 一 {record.name}</Button>
            <span className="ant-divider" />
            <Button>Delete</Button>
            <span className="ant-divider" />
        </span>
    ),
}];

class Accounts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            create: true,
            modalVisible: false,
            submit: false,
            edit: { account: '', contact: '' }
        }
        this.props.fetchAccounts(this.props.query.org);
    }
    showCreate() {
        this.setState({ create: true, modalVisible: true });
    }
    showEdit(record) {
        this.setState({ create: false, modalVisible: true, edit: { account: record.account, contact: record.contact } });
    }
    register() {
        this.props.register(this.props.query.org, this.state);
        this.setState({ submit: true });
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, addedAccount } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && addedAccount && Object.keys(addedAccount).length != 0) {
            success('添加账号成功!')
            return { modalVisible: false, submit: false };
        }
        return nextState;
    }
    hiddenDialog() {
        this.setState({ modalVisible: false });
    }

    valueChange = (prop) => (input) => {
        this.setState({ [prop]: input.target.value })
    }


    render() {

        const { accounts, fetching } = this.props;

        return (

            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="客户" second="账户" />
                <p>
                    <Button onClick={() => this.showCreate()}>注册账户</Button>
                </p>
                <Table columns={columns} dataSource={accounts} />

                <Modal
                    visible={this.state.modalVisible}
                    title={this.state.create ? '添加账户' : '编辑'}
                    okText={this.state.create ? '注册' : '保存'}
                    onOk={() => this.register()}
                    onCancel={() => this.hiddenDialog()}
                    confirmLoading={fetching}
                >
                    <CreateAccount change={this.valueChange} value={this.state.edit} />
                </Modal>
            </div>
        )

    }
}



const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['orgReducer', 'errorMsg']),
        accounts: state.getIn(['orgReducer', 'accounts'], []),
        fetching: state.getIn(['orgReducer', 'fetching']),
        addedOrg: state.getIn(['orgReducer', 'addedOrg']),
        addedAccount: state.getIn(['orgReducer', 'addedAccount'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccounts: (orgId) => {
            dispatch(fetchAccounts(orgId))
        },
        register: (orgId, account) => {
            dispatch(createAccount(orgId, account))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
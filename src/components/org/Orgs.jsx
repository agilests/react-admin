import React from 'react';
import { Spin, Modal, Table, Form, Input, Button, Select, Icon } from 'antd';
import { fetchOrgs, createOrg, deleteOrg } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import { Link } from 'react-router-dom';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { success, error } from '../widget/Message';
import TimeToDate from '../utils/Time2Date';
const FormItem = Form.Item;


const OrgForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={'注册'}
                okText={'注册'}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="联系人">
                        {getFieldDecorator('mobile')(<Input />)}
                    </FormItem>
                    <FormItem label="联系方式">
                        {getFieldDecorator('contact')(<Input />)}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)


class Orgs extends React.Component {
    constructor(props) {
        super(props)
        this.props.fetchOrgs();
        this.state = {
            visiable: false,
            submit: false,
            deleteing: null,
            deleteVisible: false,
            deleteConfirm: false
        }
        this.columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        }, {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
            render: text => <span>{TimeToDate(text)}</span>
        }, {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact',
        }, {
            title: '联系方式',
            dataIndex: 'mobile',
            key: 'mobile',
        }, {
            title: '更新时间',
            dataIndex: 'lastModified',
            key: 'lastModified',
            render: text => <span>{TimeToDate(text)}</span>
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

                    <Link to={`/app/org/accounts?org=${record.id}`}>账号管理</Link>
                    <Button onClick={() => { }}>
                        <Icon type="edit" />
                        编辑
                    </Button>
                    <Button onClick={() => { this.deleteConfirm(record) }}>
                        <Icon type="delete" />
                        删除
                    </Button>
                </span>
            ),
        }];
    }

    saveFormRef = (form) => {
        this.form = form;
    };

    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, added } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && added && Object.keys(added).length != 0) {
            success('注册客户成功!')
            return { visible: false, submit: false };
        }
        return null;
    }
    deleteConfirm = (record) => {
        this.setState({
            deleteing: record,
            deleteVisible: true
        })
    }
    deleteOrg = () => {
        this.setState({ deleteConfirm: false, deleteVisible: false, deleteing: null })
        this.props.deleteOrg(this.state.deleteing.id);
    }
    register = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            this.props.createOrg(values);
        });
    };
    render() {
        const { orgs, fetching } = this.props;
        return (

            <div className="gutter-example button-demo">
                <Spin spinning={fetching}>
                    <BreadcrumbCustom first="客户" />
                    <p>
                        <Button onClick={() => { this.setState({ visible: true }) }}>注册客户</Button>
                    </p>
                    <Table columns={this.columns} dataSource={orgs} />

                    <OrgForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onOk={this.register}
                        onCancel={() => { this.setState({ visible: false }) }}
                    />
                </Spin>
                <Modal
                    title='警告'
                    visible={this.state.deleteVisible}
                    onOk={this.deleteOrg}
                    okButtonProps={{ disabled: !this.state.deleteConfirm }}>
                    <p>此操作会删除客户下所有数据,并且不可逆</p>
                    <p>输入客户名称确认"{this.state.deleteing && this.state.deleteing.name}"删除`</p>
                    <Input onChange={(e) => {
                        if (e.target.value === this.state.deleteing.name) {
                            this.setState({ deleteConfirm: true })
                        }
                    }} />
                </Modal>
            </div>
        )
    }
}



const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['orgReducer', 'errorMsg']),
        orgs: state.getIn(['orgReducer', 'orgs'], []),
        added: state.getIn(['orgReducer', 'addedOrg']),
        fetching: state.getIn(['orgReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        },
        createOrg: (org) => {
            dispatch(createOrg(org))
        },
        deleteOrg: (id) => {
            dispatch(deleteOrg(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orgs)
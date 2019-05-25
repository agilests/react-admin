import React, { Component } from 'react';
import { Modal, Table, Form, Input, Button, Select, Icon, InputNumber } from 'antd';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from '../../redux/devices/deviceActions';
import { fetchOrgs } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { success, error } from '../widget/Message';
import TimeToDate from '../utils/Time2Date';
import SignForm from './SignForm';

const Option = Select.Option;

class Signs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            edit: false,
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        this.columns = [
            {
                title: '路牌编号',
                dataIndex: 'deviceId',
                key: 'deviceId',
                render: text => <span>{text}</span>,
            }, {
                title: '注册时间',
                dataIndex: 'created',
                key: 'created',
                render: text => <span>{TimeToDate(text)}</span>
            }, {
                title: '分区',
                dataIndex: 'vehicle',
                key: 'vehicle',
                render: text => <span>{text ? text.length : 0}</span>,
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>

                        <Button onClick={() => this.props.history.push(`/app/stations?line=${record.id}`)}>参数设置</Button>
                        <Button onClick={() => this.props.history.push(`/app/stations?line=${record.id}`)}>分区</Button>
                        <Button onClick={() => { this.edit(record) }}>
                            <Icon type="edit" />
                            编辑
                        </Button>
                        <Button onClick={() => { this.delete(record) }}>
                            <Icon type="delete" />
                            删除
                        </Button>
                    </span>
                ),
            }
        ];

        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange();
        } else {
            this.props.fetchOrgs();
        }
    }
    delete = (record) => {
        Modal.confirm({
            title: '提示',
            content: `确认删除路牌吗?`,
            onOk: () => {
                this.props.deleteDevice(record.id);
            }
        })
    }
    edit = (record) => {
        // const form = this.form;
        // this.setState({ id: record.id, edit: true, visible: true })
        // form.setFieldsValue({
        //     deviceId: record.deviceId,
        //     model: record.model,
        //     description: record.desc
        // })
    }
    register = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            this.state.edit ? this.props.update(this.state.id, values) : this.props.register(values);
        });
    };
    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, added } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && added && Object.keys(added).length != 0) {
            success('保存设备成功!')
            return { visible: false, submit: false, edit: false };
        }
        return null;
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    onChange = (orgId) => {
        this.props.fetchDevices(orgId);
    }
    render() {
        const { signs, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);
        const form = this.form || null;
        if (this.state.visible === false && this.state.submit === false) {
            form.resetFields();
        }
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="设备" second="路牌" />
                <div>
                    {
                        this.state.currentUser.role === 'ROLE_ADMIN'
                            ? (<Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入客户名称"
                                onChange={(v) => this.onChange(v)}
                            >
                                {options}
                            </Select>
                            )
                            : <Button onClick={() => this.setState({ visible: true })}>
                                <Icon type='plus' />新建路牌
                            </Button>
                    }

                </div>

                <Table columns={this.columns} dataSource={signs} />
                <SignForm
                    ref={this.saveFormRef}
                    edit={this.state.edit}
                    visible={this.state.visible}
                    onOk={this.register}
                    onCancel={() => { this.setState({ visible: false }) }}
                />

            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['deviceReducer', 'errorMsg']),
        devices: state.getIn(['deviceReducer', 'devices'], []),
        added: state.getIn(['deviceReducer', 'added']),
        fetching: state.getIn(['deviceReducer', 'fetching']),
        orgs: state.getIn(['orgReducer', 'orgs'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        },
        fetchDevices: (orgId) => {
            dispatch(fetchDevices(orgId))
        },
        register: (device) => {
            dispatch(createDevice(device))
        },
        update: (id, device) => {
            dispatch(updateDevice(id, device))
        },
        deleteDevice: (id) => {
            dispatch(deleteDevice(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signs)
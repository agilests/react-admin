import React, { Component } from 'react';
import { Modal, Table, Form, Input, Button, Select, Icon } from 'antd';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from '../../redux/devices/deviceActions';
import { fetchOrgs } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { success, error } from '../widget/Message';
import TimeToDate from '../utils/Time2Date';
const FormItem = Form.Item;
const Option = Select.Option;


const DeviceForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form, edit } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={edit ? '编辑设备' : '注册设备'}
                cancelText={'取消'}
                okText={edit ? '保存' : '注册'}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <FormItem label="设备ID">
                        {getFieldDecorator('deviceId', {
                            rules: [{ required: true, message: '请输入设备ID!' }],
                        })(
                            <Input disabled={edit} />
                        )}
                    </FormItem>
                    <FormItem label="型号">
                        {getFieldDecorator('model')(<Input />)}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)



class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            edit: false,
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        this.columns = [
            {
                title: '设备ID',
                dataIndex: 'deviceId',
                key: 'deviceId',
                render: text => <span>{text}</span>,
            }, {
                title: '设备型号',
                dataIndex: 'model',
                key: 'model',
                render: text => <span>{text}</span>,
            }, {
                title: '注册时间',
                dataIndex: 'created',
                key: 'created',
                render: text => <span>{TimeToDate(text)}</span>
            }, {
                title: '车辆',
                dataIndex: 'vehicle',
                key: 'vehicle',
                render: text => <span>{text ? text.length : 0}</span>,
            }, {
                title: '线路',
                dataIndex: 'lines',
                key: 'lines',
                render: text => <span>{text ? text.length : 0}</span>,
            }, {
                title: '当前线路',
                dataIndex: 'lines',
                key: 'currentLine',
                render: text => <span>{text}</span>,
            }, {
                title: '路牌数量',
                dataIndex: 'nos',
                key: 'nos',
                render: text => <span>{text}</span>,
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: text => <span>{text}</span>,
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>

                        <Button onClick={() => this.props.history.push(`/app/signs?device=${record.id}`)}>路牌配置</Button>
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
            content: `确认删除设备"${record.deviceId}"吗?`,
            onOk: () => {
                this.props.deleteDevice(record.id);
            }
        })
    }
    edit = (record) => {
        const form = this.form;
        this.setState({ id: record.id, edit: true, visible: true })
        form.setFieldsValue({
            deviceId: record.deviceId,
            model: record.model,
            description: record.desc
        })
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
        const { devices, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);
        const form = this.form || null;
        if (this.state.visible === false && this.state.submit === false) {
            form.resetFields();
        }
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="设备"/>
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
                            : (
                                <p>
                                    <Button onClick={() => { this.setState({ visible: true }) }}>注册设备</Button>
                                    <Button>下载模板</Button>
                                    <Button>导入设备</Button>
                                </p>
                            )
                    }

                </div>

                <Table rowKey="id" columns={this.columns} dataSource={devices} />
                <DeviceForm
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
export default connect(mapStateToProps, mapDispatchToProps)(Devices)
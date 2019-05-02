import React, { Component } from 'react';
import { Modal, Table, Form, Input, Button,Select } from 'antd';
import { fetchDevices, createDevice } from '../../redux/devices/deviceActions';
import { fetchOrgs } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;


const DeviceForm = Form.create()(
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
                    <FormItem label="设备ID">
                        {getFieldDecorator('deviceId', {
                            rules: [{ required: true, message: '请输入设备ID!' }],
                        })(
                            <Input />
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

const columns = [
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
        render: text => <span>{text}</span>,
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
        dataIndex: 'signs',
        key: 'signs',
        render: text => <span>{text ? text.length : 0}</span>,
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

                {/* <Link to={`/app/org/accounts?org=${record.id}`}>账号管理</Link> */}
                <Button onClick={() => {}}>
                编辑
                </Button>
                <span className="ant-divider" />
            </span>
        ),
    }
];

class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            admin: JSON.parse(localStorage.getItem('currentUser')).role === 'ROLE_ADMIN'
        }

        if (!this.state.admin) {
            this.onChange(props.currentUser.orgId);
        } else {
            this.props.fetchOrgs();
        }
    }
    register = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            this.props.createLine(this.props.currentUser.orgId, values);
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    onChange = (orgId) => {
        this.props.fetchDevices(orgId);
    }
    render() {
        const { devices,orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);
        console.log(devices);
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="设备" />
                <p>

                {

                    this.state.admin
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
                    
                </p>

                <Table columns={columns} dataSource={devices} />
                <DeviceForm
                    ref={this.saveFormRef}
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
        fetching: state.getIn(['deviceReducer', 'fetching']),
        orgs: state.getIn(['orgReducer','orgs'])
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
        register: (orgId, device) => {
            device.orgId = orgId;
            dispatch(createDevice(device))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Devices)
import React, { Component } from 'react';
import { Spin, Modal, Table, Form, Input, Button, Select, Popover } from 'antd';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { fetchVehicles, createVehicle } from '../../redux/vehicle/vehicleActions';
import { success, error } from '../widget/Message';

const FormItem = Form.Item;
const Option = Select.Option;



const VehicleForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form, fetching, editVehicle } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={'编辑线路'}
                okText={'保存'}
                onOk={onOk}
                onCancel={onCancel}
                confirmLoading={fetching}
            >
                <Form layout="vertical">
                    <FormItem label="车牌号">
                        {getFieldDecorator('license', {
                            initialValue: editVehicle ? editVehicle.name : '',
                            rules: [{ required: true, message: '请输入车牌号!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('desc', {
                            initialValue: editVehicle ? editVehicle.desc : '',
                        })(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        this.columns = [{
            title: '车牌号',
            dataIndex: 'license',
            key: 'license',
            render: text => <span>{text}</span>,
        }, {
            title: '线路',
            dataIndex: 'line',
            key: 'line',
            render: (e, record) => {
            },
        }, {
            title: '设备',
            dataIndex: 'device',
            key: 'device',
            render: (e, record) => {
            },
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.props.history.push(`/app/stations?line=${record.id}`)}>绑定线路</Button>
                    <Button onClick={() => this.showEdit(record)}>绑定设备</Button>
                    <Button onClick={() => { this.deleteVehicle(record) }}>删除</Button>
                </span>
            ),
        }];
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange();
        }
    }
    showEdit = (record) => {
        this.setState({ editVehicle: record, visible: true })
    }

    deleteVehicle = (record) => {
        Modal.confirm({
            title: '提示',
            content: `确认删除车辆"${record.name}"吗?`,
            onOk: () => {
                this.props.deleteVehicle(record.id);
            }
        })
    }
    addVehicle = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            this.props.createVehicle(values);
        });
    }
    editVehicle = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            values.id = this.state.editVehicle.id;
            this.props.updateVehicle(values);
        });
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, added } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && added && Object.keys(added).length != 0) {
            success('添加车辆成功!')
            return { visible: false, submit: false };
        }
        return null;
    }
    showDialog = () => {
        this.setState({ visible: true });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    onChange = (orgId) => {
        this.props.fetchVehicles(orgId);
    }
    render() {
        const { vehicles, fetching, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);

        return (
            <div className="gutter-example button-demo">
                <Spin spinning={fetching}>
                    <BreadcrumbCustom first="线路" />

                    {

                        this.state.currentUser.role === 'ROLE_ADMIN'
                            ? <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入客户名称"
                                onChange={(v) => this.onChange(v)}
                            >
                                {options}
                            </Select>
                            : <Button onClick={() => this.showDialog()}>添加车辆</Button>
                    }


                    <Table columns={this.columns} rowKey='id' dataSource={vehicles} />

                    <VehicleForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        editVehicle={this.state.editVehicle}
                        fetching={fetching}
                        onOk={this.state.editVehicle ? this.editVehicle : this.addVehicle}
                        onCancel={() => { this.setState({ visible: false }) }}
                    />
                </Spin>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['vehicleReducer', 'errorMsg']),
        orgs: state.getIn(['orgReducer', 'orgs']),
        added: state.getIn(['vehicleReducer', 'added']),
        vehicles: state.getIn(['vehicleReducer', 'vehicles'], []),
        fetching: state.getIn(['vehicleReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchVehicles: (orgId) => {
            dispatch(fetchVehicles(orgId))
        },
        createVehicle: (vehicle) => {
            dispatch(createVehicle(vehicle))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vehicles)
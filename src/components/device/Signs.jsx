import React, { Component } from 'react';
import { Modal, Table, Button, Icon, Dropdown, Menu, Empty } from 'antd';
import { fetchSigns, fetchSignTemplates, createSign } from '../../redux/sign/signActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SignForm from './SignForm';
import { success, error } from '../widget/Message';

class Signs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            part: null,
            edit: null
        }
        this.columns = [
            {
                title: '路牌编号',
                dataIndex: 'id',
                key: 'id',
                render: text => <span>{text.substring(0, 4)}</span>,
            }, {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
                render: text => <span>{text}</span>
            }, {
                title: '协议',
                dataIndex: 'protocol',
                key: 'protocol',
                render: text => <span>{text}</span>
            }, {
                title: '分区',
                dataIndex: 'nop',
                key: 'nop',
                render: text => <span>{text}</span>,
            }, {
                title: '是否为模板',
                dataIndex: 'templateId',
                key: 'templateId',
                render: text => <span>{text ? '是' : '否'}</span>,
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>

                        <Button >参数设置</Button>
                        <Button onClick={() => this.props.history.push(`/app/parts?sign=${record.id}`)}>
                            <Icon type="pic-left" /> 分区
                            </Button>
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
        this.props.fetchSigns(this.props.query.device)
        this.props.fetchSignTemplates();
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
        this.setState({ edit: record, visible: true });
    }
    saveFormRef = (form) => {
        this.form = form;
    };

    create = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            if (this.state.edit) {
            } else {
                this.props.createSign(this.props.query.device, values);
            }
            form.resetFields();
        });
    };
    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, added } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && added && Object.keys(added).length != 0) {
            success('添加路牌成功!')
            return { submit: false, continues: true };
        }
        return null;
    }

    render() {
        const { signs } = this.props;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="设备" second="路牌" />
                <Button onClick={() => { this.setState({ visible: true }) }}>
                    <Icon type='plus' />新建路牌
                </Button>

                <Table rowKey='id' columns={this.columns} dataSource={signs} />


                <Modal
                    visible={this.state.visible}
                    title={this.state.edit ? '编辑' : '添加路牌'}
                    cancelText={'取消'}
                    okText={!this.state.edit && this.state.continues ? '继续添加' : '保存'}
                    onOk={this.create}
                    onCancel={() => { this.setState({ visible: false }) }}
                >
                    <SignForm
                        ref={this.saveFormRef}
                        sign={this.state.edit}
                        templates={this.props.templates} />
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['signReducer', 'errorMsg']),
        signs: state.getIn(['signReducer', 'signs'], []),
        added: state.getIn(['signReducer', 'added']),
        fetching: state.getIn(['signReducer', 'fetching']),
        templates: state.getIn(['signReducer', 'templates'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchSigns: (deviceId) => {
            dispatch(fetchSigns(deviceId))
        },
        fetchSignTemplates: () => {
            dispatch(fetchSignTemplates())
        },
        createSign: (deviceId, sign) => {
            dispatch(createSign(deviceId, sign))
        },
        // update: (id, device) => {
        //     dispatch(updateDevice(id, device))
        // },
        // deleteDevice: (id) => {
        //     dispatch(deleteDevice(id))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signs)
import React, { Component } from "react";
import { Spin, Form, Icon, Switch, Input, Button, Upload, Select, Modal, InputNumber } from 'antd';
import { connect } from '../../connect'
// import {fetchSignTemplate} from '../../redux/sign/signActions';

const FormItem = Form.Item;
const Option = Select.Option;

class _SignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromTemplate: false
        }
    }
    render() {

        const { visible, onOk, onCancel, form, edit } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={edit ? '编辑路牌' : '注册路牌'}
                cancelText={'取消'}
                okText={'保存'}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form layout="vertical">

                    <FormItem label="从模板创建">
                        {getFieldDecorator('templateId')(
                            <Select placeholder='选择路牌模板快速添加路牌' onChange={(v) => {
                                this.setState({ fromTemplate: true })
                            }}>
                                <Option key={'hengwu'} value="hengwu">{'恒舞'}</Option>
                                <Option key={'baiyetian'} value="baiyetian">{'白夜天'}</Option>
                            </Select>
                        )}
                    </FormItem>
                    {
                        !this.state.fromTemplate &&
                        <div>
                            <FormItem label="协议">
                                {getFieldDecorator('protocol', {
                                    rules: [{ required: true, message: '请选择路牌协议' }],
                                })(
                                    <Select placeholder='选择路牌协议' >
                                        <Option value="hengwu">{'恒舞'}</Option>
                                        <Option value="baiyetian">{'白夜天'}</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="宽">
                                {getFieldDecorator('width', {
                                    rules: [{ required: true, message: '请输入路牌宽度' }]
                                })(<InputNumber placeholder='路牌宽度' />)}
                            </FormItem>
                            <FormItem label="高">
                                {getFieldDecorator('height', {
                                    rules: [{ required: true, message: '请输入路牌高度' }]
                                })(<InputNumber placeholder='路牌宽度' />)}
                            </FormItem>
                            <FormItem label="描述">
                                {getFieldDecorator('desc')(<Input type="textarea" />)}
                            </FormItem>
                            <FormItem label="是否保存为模板">
                                {getFieldDecorator('saveAs')(<Switch />)}
                            </FormItem>
                        </div>
                    }
                </Form>
            </Modal>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['resourceReducer', 'errorMsg']),
        uploading: state.getIn(['resourceReducer', 'fetching']),
        added: state.getIn(['resourceReducer', 'added'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // upload: (formData) => {
        //     dispatch(upload(formData))
        // }
    }
}
const SignForm = Form.create()(_SignForm);
export default connect(mapStateToProps, mapDispatchToProps)(SignForm)
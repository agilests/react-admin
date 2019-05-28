import React, { Component } from "react";
import { Spin, Form, Icon, Switch, Input, Button, Upload, Select, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class _SignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromTemplate: false,
            saveAs: false
        }
    }
    render() {

        const { form, sign, templates } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form ref={(form) => this.form = form} layout="vertical">

                <FormItem label="从模板创建">
                    {getFieldDecorator('templateId')(
                        <Select placeholder='选择路牌模板快速添加路牌' onChange={(v) => {
                            this.setState({ fromTemplate: true })
                        }}>
                            {
                                templates && templates.map(t => <Option key={t.id} value={t.id}>{t.name}</Option>)
                            }
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
                        <FormItem label="是否保存为模板">
                            {getFieldDecorator('saveAs')(<Switch onChange={() => this.setState({saveAs:true})} />)}
                        </FormItem>
                        {
                            this.state.saveAs && 
                            <FormItem label="模板名称">
                                {getFieldDecorator('name',{
                                    rules:[{required:true,message:'请输入模板名称'}]
                                })(<Input placeholder='请输入模板名称' />)}
                            </FormItem>
                        }
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(<Input type="textarea" />)}
                        </FormItem>
                    </div>
                }
            </Form>
        )
    }
}


const SignForm = Form.create()(_SignForm);
export default SignForm;
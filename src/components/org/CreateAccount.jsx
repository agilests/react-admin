import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

class CreateAccount extends Component {
    render() {

        const { getFieldDecorator } = this.props.form;
        const { account, password, contact } = this.props.value;
        debugger;
        return (
            <Form layout="vertical">
                <FormItem label="账号">
                    {getFieldDecorator('account', {
                        rules: [{
                            required: true, message: '请输入账号!',
                        }],
                    })(
                        <Input placeholder="用户名" value={account} onChange={this.props.change('account')} />
                    )}
                </FormItem>

                <FormItem label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!', }]
                    })(<Input type="password" placeholder="密码" value={password} onChange={this.props.change('password')} />)}

                </FormItem>

                <FormItem label="联系方式">
                    {getFieldDecorator('phone', {
                        rules: [{ message: '请输入你的电话号码!' }],
                    })(
                        <Input placeholder="电话" value={contact} onChange={this.props.change('contact')} />
                    )}
                </FormItem>
                <FormItem label="描述">
                    <Input type="textarea" />
                </FormItem>
                <FormItem className="collection-create-form_last-form-item" style={{ marginBottom: 0 }}>
                    {/* <Radio.Group>
                            <Radio value="public">公开</Radio>
                            <Radio value="private">私有</Radio>
                        </Radio.Group> */}
                </FormItem>
            </Form>
        )
    }
}

const CreateAccountForm = Form.create()(CreateAccount);

export default CreateAccountForm;
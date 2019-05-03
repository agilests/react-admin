import React from 'react';
import { Spin, Table, Button, Modal, Input, Steps, Row, Icon, Form, Divider, Col } from 'antd';

const FormItem = Form.Item;

const InputBox = props => <div className={`height-${props.value}`}>{props.children}</div>;

export const StationForm = Form.create()(
    (props) => {
        const { form, fetching, station } = props;
        const { getFieldDecorator } = form;
        const short = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        }
        const long = {
            labelCol: { span: 8 },
            wrapperCol: { span: 18 },
            style: { marginBottom: '0px' }
        }
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <Form layout="horizontal">
                <Row gutter={24}>
                    <Col span={6}>
                        <Row>
                            <Divider orientation="left">GPS</Divider>
                            <Row type="flex" justify="start" gutter={12}>
                                <Col span={12}>
                                    <FormItem label="经度" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="纬度" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col>
                                    <FormItem label="角度" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Divider orientation="left">转弯信息</Divider>
                            <Row>
                                <Col>
                                    <FormItem label="角度" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormItem label="角度" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col span={18}  type="flex" justify="start">
                        <Row>
                            <Divider orientation="left">进站信息</Divider>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem label="站前广告" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>   
                                    <FormItem label="本站提示" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>   
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Divider orientation="left">出站信息</Divider>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem label="站前广告" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>  
                                    <FormItem label="下一站" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>    
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入线路名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }
)
export default StationForm
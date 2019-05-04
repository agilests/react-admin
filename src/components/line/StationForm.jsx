import React, { Component } from 'react';
import { Spin, Table, Button, Modal, Input, Upload, InputNumber, Steps, Row, Icon, Form, Divider, Col } from 'antd';
import ResourceSelect from './ResourceSelect';
const FormItem = Form.Item;

const InputBox = props => <div className={`height-${props.value}`}>{props.children}</div>;


class StationForm extends Component {

    constructor(props) {
        super(props)
    }
    buildUploadForm = (key) => {
        const { orgId } = this.props;
        return Modal.info({
            Icon: null,
            title: '上传语音文件',
            content: <ResourceSelect resourceKey={key} orgId={orgId} />
        })
    }
    render() {
        const { form, fetching, station } = this.props;
        const { getFieldDecorator } = form;
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
                                        {getFieldDecorator('lng')(
                                            <InputNumber />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="纬度" {...inputStyle}>
                                        {getFieldDecorator('lat')(
                                            <InputNumber />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={24}>
                                    <FormItem label="角度" {...inputStyle}>
                                        {getFieldDecorator('angle')(
                                            <InputNumber />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Divider orientation="left">转弯信息</Divider>
                            <Row>
                                <Col>
                                    <FormItem label="转弯音乐" {...inputStyle}>
                                        {getFieldDecorator('swerve.music')(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormItem label="转弯提示" {...inputStyle}>
                                        {getFieldDecorator('swerve.hint')(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col span={18} type="flex" justify="start">
                        <Row>
                            <Divider orientation="left">进站信息</Divider>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem label="站前广告" {...inputStyle}>
                                        {getFieldDecorator('entry.ad', {
                                            rules: [{ required: true, message: '请选择站前广告!' }],
                                        })(
                                            <Input onClick={() => this.buildUploadForm('entry.ad')} />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('entry.junction', {
                                            rules: [{ required: true, message: '请选择转车提醒!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="本站提示" {...inputStyle}>
                                        {getFieldDecorator('entry.current', {
                                            rules: [{ required: true, message: '请选择本站提示!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('entry.custom1')(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('entry.hint', {
                                            rules: [{ required: true, message: '请选择温馨提示!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('entry.custom2')(
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
                                    <FormItem label="出站广告" {...inputStyle}>
                                        {getFieldDecorator('exit.ad', {
                                            rules: [{ required: true, message: '请选择出站广告!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('exit.junction', {
                                            rules: [{ required: true, message: '请选择转车提醒!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="下一站" {...inputStyle}>
                                        {getFieldDecorator('exit.next', {
                                            rules: [{ required: true, message: '请选择下一站!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('exit.custom1')(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('exit.hint', {
                                            rules: [{ required: true, message: '请选择温馨提示!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('exit.custom2')(
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
}

export default Form.create()(StationForm)
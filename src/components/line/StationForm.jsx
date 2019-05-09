import React, { Component } from 'react';
import { Spin, Table, Button, Modal, Input, Upload, InputNumber, Steps, Row, Icon, Form, Divider, Col } from 'antd';
import ResourceUpload from './ResourceUpload'
import resourceKey from './ResourceKeys';
import Resource from './Resource';
const FormItem = Form.Item;

const InputBox = props => <div className={`height-${props.value}`}>{props.children}</div>;


class StationForm extends Component {

    constructor(props) {
        super(props)
    }
    buildUploadForm = (key) => {
        return Modal.info({
            Icon: null,
            title: '上传语音文件',
            content: <ResourceUpload resourceKey={key} />
        })
    }
    render() {
        const { form, fetching, station } = this.props;
        console.log(station);
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
                                        {getFieldDecorator('lng', {
                                            initialValue: station && station.lng
                                        })(
                                            <InputNumber />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="纬度" {...inputStyle}>
                                        {getFieldDecorator('lat', {
                                            initialValue: station && station.lat
                                        })(
                                            <InputNumber />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="start">
                                <Col span={24}>
                                    <FormItem label="角度" {...inputStyle}>
                                        {getFieldDecorator('angle', {
                                            initialValue: station && station.angle
                                        })(
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
                                        {getFieldDecorator('swerve.music', {
                                            // initialValue: station && station.swerve && station.swerve.filter(h => h.key = resourceKey.ANGLE_AD)
                                            initialValue: {id:1}
                                        })(
                                            <Resource resources={[{id:1,name:'a'},{id:2,name:'b'}]} mark={resourceKey.ANGLE_AD}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormItem label="转弯提示" {...inputStyle}>
                                        {getFieldDecorator('swerve.hint', {
                                            initialValue: station && station.swerve && station.swerve.filter(h => h.key = resourceKey.ANGLE_HINT)
                                        })(
                                            <Resource mark={resourceKey.ANGLE_HINT}/>
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
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.ENTER_AD)
                                        })(
                                            <Resource mark={resourceKey.ENTER_AD}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('enter.junction', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.ENTER_JUNCTION)
                                        })(
                                            <Resource mark={resourceKey.ENTER_AD}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="本站提示" {...inputStyle}>
                                        {getFieldDecorator('enter.current', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.CURRENT)
                                        })(
                                            <Resource mark={resourceKey.CURRENT}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('entry.custom1', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.CUSTOM1)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM1}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('entry.hint', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.ENTER_HINT)
                                        })(
                                            <Resource mark={resourceKey.ENTER_HINT}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('entry.custom2', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.CUSTOM2)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM2}/>
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
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.EXIT_AD)
                                        })(
                                            <Resource mark={resourceKey.EXIT_AD}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('exit.junction', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.EXIT_JUNCTION)
                                        })(
                                            <Resource mark={resourceKey.EXIT_JUNCTION}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="下一站" {...inputStyle}>
                                        {getFieldDecorator('exit.next', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.NEXT)
                                        })(
                                            <Resource mark={resourceKey.NEXT}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('exit.custom1', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.CUSTOM1)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM1}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('exit.hint', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.EXIT_HINT)
                                        })(
                                            <Resource mark={resourceKey.EXIT_HINT}/>
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('exit.custom2', {
                                            initialValue: station && station.enter && station.enter.filter(h => h.key = resourceKey.CUSTOM2)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM2}/>
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
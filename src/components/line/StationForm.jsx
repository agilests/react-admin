import React, { Component } from 'react';
import { Modal, InputNumber, Row, Form, Divider, Col } from 'antd';
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
    getValue = (k, rk) => {
        const { station } = this.props;
        if (station && station[k]) {
            const v = station[k].filter(h => h.key === rk);
            if (v && v.length > 0) {
                return v[0];
            }
        }
        return null;
    }
    render() {
        const { form, resources, station, change } = this.props;
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
                                            <InputNumber onBlur={(e) => change('lng', parseFloat(e.target.value))} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="纬度" {...inputStyle}>
                                        {getFieldDecorator('lat', {
                                            initialValue: station && station.lat
                                        })(
                                            <InputNumber onBlur={(e) => change('lat', parseFloat(e.target.value))} />
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
                                            <InputNumber onBlur={(e) => change('angle', parseFloat(e.target.value))} />
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
                                        {getFieldDecorator('swerve.ad', {
                                            initialValue: this.getValue('swerve', resourceKey.ANGLE_AD)
                                        })(
                                            <Resource
                                                resources={resources && resources.filter(r => r.key === resourceKey.ANGLE_AD)}
                                                done={(v) => change('swerve.ad', v)}
                                                mark={resourceKey.ANGLE_AD} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormItem label="转弯提示" {...inputStyle}>
                                        {getFieldDecorator('swerve.hint', {
                                            initialValue: this.getValue('swerve', resourceKey.ANGLE_HINT)
                                        })(
                                            <Resource
                                                mark={resourceKey.ANGLE_HINT}
                                                done={(v) => change('swerve.hint', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.ANGLE_HINT)} />
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
                                        {getFieldDecorator('enter.ad', {
                                            initialValue: this.getValue('enter', resourceKey.ENTER_AD)
                                        })(
                                            <Resource mark={resourceKey.ENTER_AD}
                                                done={(v) => change('enter.ad', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.ENTER_AD)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('enter.junction', {
                                            initialValue: this.getValue('enter', resourceKey.ENTER_JUNCTION)
                                        })(
                                            <Resource mark={resourceKey.ENTER_AD}
                                                done={(v) => change('enter.junction', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.ENTER_JUNCTION)} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="本站提示" {...inputStyle}>
                                        {getFieldDecorator('enter.current', {
                                            initialValue: this.getValue('enter', resourceKey.CURRENT)
                                        })(
                                            <Resource mark={resourceKey.CURRENT}
                                                done={(v) => change('enter.current', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.CURRENT)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('entry.custom1', {
                                            initialValue: this.getValue('enter', resourceKey.CUSTOM1)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM1}
                                                done={(v) => change('enter.custom1', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.CUSTOM1)} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('entry.hint', {
                                            initialValue: this.getValue('enter', resourceKey.ENTER_HINT)
                                        })(
                                            <Resource mark={resourceKey.ENTER_HINT}
                                                done={(v) => change('enter.hint', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.ENTER_HINT)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('entry.custom2', {
                                            initialValue: this.getValue('enter', resourceKey.CUSTOM2)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM2}
                                                done={(v) => change('enter.custom2', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.CUSTOM2)} />
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
                                            initialValue: this.getValue('exit', resourceKey.EXIT_AD)
                                        })(
                                            <Resource mark={resourceKey.EXIT_AD}
                                                done={(v) => change('exit.ad', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.EXIT_AD)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="转车提醒" {...inputStyle}>
                                        {getFieldDecorator('exit.junction', {
                                            initialValue: this.getValue('exit', resourceKey.EXIT_JUNCTION)
                                        })(
                                            <Resource mark={resourceKey.EXIT_JUNCTION}
                                                done={(v) => change('exit.junction', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.EXIT_JUNCTION)} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="下一站" {...inputStyle}>
                                        {getFieldDecorator('exit.next', {
                                            initialValue: this.getValue('exit', resourceKey.NEXT)
                                        })(
                                            <Resource mark={resourceKey.NEXT}
                                                done={(v) => change('exit.next', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.NEXT)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义1" {...inputStyle}>
                                        {getFieldDecorator('exit.custom1', {
                                            initialValue: this.getValue('exit', resourceKey.CUSTOM1)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM1}
                                                done={(v) => change('exit.custom1', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.CUSTOM1)} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="温馨提示" {...inputStyle}>
                                        {getFieldDecorator('exit.hint', {
                                            initialValue: this.getValue('exit', resourceKey.EXIT_HINT)
                                        })(
                                            <Resource mark={resourceKey.EXIT_HINT}
                                                done={(v) => change('exit.hint', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.EXIT_HINT)} />
                                        )}
                                    </FormItem>
                                    <FormItem label="自定义2" {...inputStyle}>
                                        {getFieldDecorator('exit.custom2', {
                                            initialValue: this.getValue('exit', resourceKey.CUSTOM2)
                                        })(
                                            <Resource mark={resourceKey.CUSTOM2}
                                                done={(v) => change('exit.custom2', v)}
                                                resources={resources && resources.filter(r => r.key === resourceKey.CUSTOM2)} />
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
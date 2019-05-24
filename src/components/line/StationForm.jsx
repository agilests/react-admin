import React, { Component } from 'react';
import { Input, InputNumber, Row, Form, Col } from 'antd';
import resourceKey from './ResourceKeys';
import Resource from './Resource';
const FormItem = Form.Item;

const getValue = (station, k) => {

    // const { station } = this.props;
    if (station && station[k]) {
        return station[k];
    }

    return null;
}


export class Base extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, resources, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <Form layout="vertical">
                <FormItem label="名称">
                    {getFieldDecorator('name', {
                        initialValue: station && station.name
                    })(
                        <Input style={{ width: '30%' }}/* onBlur={(e) => change('name', '', e.target.value)}*/ />
                    )}
                </FormItem>
            </Form>
        )
    }
}



export class Coordinate extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, resources, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <Form layout="vertical">
                <FormItem label="经度">
                    {getFieldDecorator('lng', {
                        initialValue: station && station.lng
                    })(
                        <InputNumber style={{ width: '30%' }} onBlur={(e) => change('lng', '', parseFloat(e.target.value))} />
                    )}
                </FormItem>
                <FormItem label="纬度">
                    {getFieldDecorator('lat', {
                        initialValue: station && station.lat
                    })(
                        <InputNumber style={{ width: '30%' }} onBlur={(e) => change('lat', '', parseFloat(e.target.value))} />
                    )}
                </FormItem>
                <FormItem label="角度">
                    {getFieldDecorator('angle', {
                        initialValue: station && station.angle
                    })(
                        <InputNumber style={{ width: '30%' }} onBlur={(e) => change('angle', '', parseFloat(e.target.value))} />
                    )}
                </FormItem>
            </Form>
        )
    }
}


export class Swerve extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, resources, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <div style={{ display: visible ? 'inline' : 'none' }}>
                <Row>
                    <Col span={8}>
                        <FormItem label="转弯音乐" {...inputStyle}>
                            {getFieldDecorator('swerve.music', {
                                initialValue: getValue(station, 'swerveMusic')
                            })(
                                <Resource
                                    resources={resources}
                                    done={(v) => change('swerve.music', resourceKey.ANGLE_MUSIC, v)}
                                    mark={resourceKey.ANGLE_MUSIC} />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <FormItem label="转弯提示" {...inputStyle}>
                            {getFieldDecorator('swerve.hint', {
                                initialValue: getValue(station, 'swerveHint')
                            })(
                                <Resource
                                    mark={resourceKey.ANGLE_HINT}
                                    done={(v) => change('swerve.hint', resourceKey.ANGLE_HINT, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}



export class Entry extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, resources, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <div style={{ display: visible ? 'inline' : 'none' }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="站前广告" {...inputStyle}>
                            {getFieldDecorator('entry.ad', {
                                initialValue: getValue(station, 'entryMusic')
                            })(
                                <Resource mark={resourceKey.ENTRY_AD}
                                    done={(v) => change('entry.ad', resourceKey.ENTRY_AD, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="转车提醒" {...inputStyle}>
                            {getFieldDecorator('entry.junction', {
                                initialValue: getValue(station, 'entryJunction')
                            })(
                                <Resource mark={resourceKey.ENTRY_JUNCTION}
                                    done={(v) => change('entry.junction', resourceKey.ENTRY_JUNCTION, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="本站提示" {...inputStyle}>
                            {getFieldDecorator('entry.current', {
                                initialValue: getValue(station, 'current')
                            })(
                                <Resource mark={resourceKey.CURRENT}
                                    done={(v) => change('entry.current', resourceKey.CURRENT, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义1" {...inputStyle}>
                            {getFieldDecorator('entry.custom1', {
                                initialValue: getValue(station, 'entryCustom1')
                            })(
                                <Resource mark={resourceKey.ENTRY_CUSTOM1}
                                    done={(v) => change('entry.custom1', resourceKey.ENTRY_CUSTOM1, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="温馨提示" {...inputStyle}>
                            {getFieldDecorator('entry.hint', {
                                initialValue: getValue(station, 'entryHint')
                            })(
                                <Resource mark={resourceKey.ENTRY_HINT}
                                    done={(v) => change('entry.hint', resourceKey.ENTRY_HINT, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义2" {...inputStyle}>
                            {getFieldDecorator('entry.custom2', {
                                initialValue: getValue(station, 'entryCustom2')
                            })(
                                <Resource mark={resourceKey.ENTRY_CUSTOM2}
                                    done={(v) => change('entry.custom2', resourceKey.ENTRY_CUSTOM2, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}



export class Exit extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, resources, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        const inputStyle = {
            style: { marginBottom: '0px' }
        }
        return (
            <div style={{ display: visible ? 'inline' : 'none' }}>

                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="出站广告" {...inputStyle}>
                            {getFieldDecorator('exit.ad', {
                                initialValue: getValue(station, 'exitAd')
                            })(
                                <Resource mark={resourceKey.EXIT_AD}
                                    done={(v) => change('exit.ad', resourceKey.EXIT_AD, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="转车提醒" {...inputStyle}>
                            {getFieldDecorator('exit.junction', {
                                initialValue: getValue(station, 'exitJunction')
                            })(
                                <Resource mark={resourceKey.EXIT_JUNCTION}
                                    done={(v) => change('exit.junction', resourceKey.EXIT_JUNCTION, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="下一站" {...inputStyle}>
                            {getFieldDecorator('exit.next', {
                                initialValue: getValue(station, 'next')
                            })(
                                <Resource mark={resourceKey.NEXT}
                                    done={(v) => change('exit.next', resourceKey.NEXT, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义1" {...inputStyle}>
                            {getFieldDecorator('exit.custom1', {
                                initialValue: getValue(station, 'exitCustom1')
                            })(
                                <Resource mark={resourceKey.EXIT_CUSTOM1}
                                    done={(v) => change('exit.custom1', resourceKey.EXIT_CUSTOM1, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="温馨提示" {...inputStyle}>
                            {getFieldDecorator('exit.hint', {
                                initialValue: getValue(station, 'exitHint')
                            })(
                                <Resource mark={resourceKey.EXIT_HINT}
                                    done={(v) => change('exit.hint', resourceKey.EXIT_HINT, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义2" {...inputStyle}>
                            {getFieldDecorator('exit.custom2', {
                                initialValue: getValue(station, 'exitCustom2')
                            })(
                                <Resource mark={resourceKey.EXIT_CUSTOM2}
                                    done={(v) => change('exit.custom2', resourceKey.EXIT_CUSTOM2, v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export const BaseForm = Form.create()(Base);
export const CoordinateForm = Form.create()(Coordinate);
export const SwerveForm = Form.create()(Swerve);
export const EntryForm = Form.create()(Entry);
export const ExitForm = Form.create()(Exit);
export default { BaseForm, CoordinateForm, EntryForm, SwerveForm, Exit }
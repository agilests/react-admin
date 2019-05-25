import React, { Component } from 'react';
import { Input, InputNumber, Row, Form, Col, Button, Icon } from 'antd';
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
        const { form, station, change, visible, deleteHandler, insertHandler } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        return (

            <div style={{ display: visible ? 'inline' : 'none' }}>
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            initialValue: station && station.name
                        })(
                            <Input style={{ width: '30%' }} onBlur={(e) => change('name', '', e.target.value)} />
                        )}
                    </FormItem>
                    <Button type="primary" onClick={() => {
                        insertHandler(station.orientation, station.seq + 1)
                    }}>
                        <Icon type='remove' />
                        插入站点
                    </Button>
                    <Button type="primary" onClick={deleteHandler}>
                        <Icon type='remove' />
                        删除站点
                    </Button>
                </Form>
            </div>
        )
    }
}



export class Coordinate extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { form, station, change, visible } = this.props;
        console.log(station);
        const { getFieldDecorator } = form;
        return (
            <div style={{ display: visible ? 'inline' : 'none' }}>
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
            </div>
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
                            {getFieldDecorator('swerveMusic', {
                                initialValue: getValue(station, 'swerveMusic')
                            })(
                                <Resource
                                    resources={resources}
                                    done={(v) => change('swerveMusic', 'swerve.music', v)} />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <FormItem label="转弯提示" {...inputStyle}>
                            {getFieldDecorator('swerveHint', {
                                initialValue: getValue(station, 'swerveHint')
                            })(
                                <Resource
                                    mark={resourceKey.ANGLE_HINT}
                                    done={(v) => change('swerveHint', 'swerve.hint', v)} />
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
                            {getFieldDecorator('entryMusic', {
                                initialValue: getValue(station, 'entryMusic')
                            })(
                                <Resource mark={resourceKey.ENTRY_AD}
                                    done={(v) => change('entryMusic', 'entry.ad', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="转车提醒" {...inputStyle}>
                            {getFieldDecorator('entryJunction', {
                                initialValue: getValue(station, 'entryJunction')
                            })(
                                <Resource mark={resourceKey.ENTRY_JUNCTION}
                                    done={(v) => change('entryJunction', 'entry.junction', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="本站提示" {...inputStyle}>
                            {getFieldDecorator('current', {
                                initialValue: getValue(station, 'current')
                            })(
                                <Resource mark={resourceKey.CURRENT}
                                    done={(v) => change('current', 'entry.current', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义1" {...inputStyle}>
                            {getFieldDecorator('entryCustom1', {
                                initialValue: getValue(station, 'entryCustom1')
                            })(
                                <Resource mark={resourceKey.ENTRY_CUSTOM1}
                                    done={(v) => change('entryCustom1', 'entry.custom1', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="温馨提示" {...inputStyle}>
                            {getFieldDecorator('entryHint', {
                                initialValue: getValue(station, 'entryHint')
                            })(
                                <Resource mark={resourceKey.ENTRY_HINT}
                                    done={(v) => change('entryHint', 'entry.hint', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义2" {...inputStyle}>
                            {getFieldDecorator('entryCustom2', {
                                initialValue: getValue(station, 'entryCustom2')
                            })(
                                <Resource mark={resourceKey.ENTRY_CUSTOM2}
                                    done={(v) => change('entryCustom2', 'entry.custom2', v)}
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
                            {getFieldDecorator('exitAd', {
                                initialValue: getValue(station, 'exitAd')
                            })(
                                <Resource mark={resourceKey.EXIT_AD}
                                    done={(v) => change('exitAd', 'exit.ad', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="转车提醒" {...inputStyle}>
                            {getFieldDecorator('exitJunction', {
                                initialValue: getValue(station, 'exitJunction')
                            })(
                                <Resource mark={resourceKey.EXIT_JUNCTION}
                                    done={(v) => change('exitJunction', 'exit.junction', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="下一站" {...inputStyle}>
                            {getFieldDecorator('next', {
                                initialValue: getValue(station, 'next')
                            })(
                                <Resource mark={resourceKey.NEXT}
                                    done={(v) => change('next', 'exit.next', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义1" {...inputStyle}>
                            {getFieldDecorator('exitCustom1', {
                                initialValue: getValue(station, 'exitCustom1')
                            })(
                                <Resource mark={resourceKey.EXIT_CUSTOM1}
                                    done={(v) => change('exitCustom1', 'exit.custom1', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="温馨提示" {...inputStyle}>
                            {getFieldDecorator('exitHint', {
                                initialValue: getValue(station, 'exitHint')
                            })(
                                <Resource mark={resourceKey.EXIT_HINT}
                                    done={(v) => change('exitHint', 'exit.hint', v)}
                                    resources={resources} />
                            )}
                        </FormItem>
                        <FormItem label="自定义2" {...inputStyle}>
                            {getFieldDecorator('exitCustom2', {
                                initialValue: getValue(station, 'exitCustom2')
                            })(
                                <Resource mark={resourceKey.EXIT_CUSTOM2}
                                    done={(v) => change('exitCustom2', 'exit.custom2', v)}
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
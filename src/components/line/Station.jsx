import React, { Component } from 'react';
import { Spin, Button, Modal, Input, Steps, Row, Icon, Form, Empty, Col } from 'antd';
import { fetchStations, addStation, updateStationKey, deleteStation } from '../../redux/lines/lineActions';
import { fetchVoices } from '../../redux/resource/resActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import StationForm from './StationForm';
import { success, error } from '../widget/Message';

const Step = Steps.Step;
const FormItem = Form.Item;

const AddForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={'注册'}
                okText={'注册'}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)
class Station extends Component {
    constructor(props) {
        super(props);
        this.props.fetchStations(this.props.query.line);
        this.state = {
            upIndex: -1,
            downIndex: -1,
            editStation: null,
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            addStationForm: false,
            stationFormVisible: false
        }
        this.props.fetchResources();
    }
    showAddStation = (type) => {
        this.setState({ type: type, addStationForm: true })
    }
    addStation = () => {

        const addStationForm = this.addStationForm;
        addStationForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            values.upOrDown = this.state.type;
            this.props.addStation(this.props.query.line, values);
        });
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, addedStation } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && addedStation) {
            success('添加站点成功!')
            //TODO 选中当前站点
            return { addStationForm: false, submit: false };
        }
        return null;
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    saveAddStationFormRef = (form) => {
        this.addStationForm = form;
    }
    buildSteps = (stations, state) => {
        let steps = stations.map(d =>
            <Step key={d.name} style={{ cursor: "pointer" }}
                title={d.name}
                onClick={(v) => {
                    let index = stations.findIndex(e => e.name === d.name);
                    this.setState({ upIndex: -1, downIndex: -1 })
                    this.setState({ [state]: index, editStation: stations[index], stationFormVisible: true })
                }} />
        );
        steps.push(<Step
            key={'add'}
            style={{ cursor: "pointer" }}
            icon={<Icon type="plus" />}
            title={'添加站点'}
            onClick={() => {
                this.showAddStation(state === 'upIndex' ? 'UP' : 'DOWN');
            }}
        />)
        return steps;
    }
    change = (key, value) => {
        const editStation = this.state.editStation;
        editStation[key] = value;
        this.props.updateStationKey(editStation.id, key, value)
        this.form.resetFields([key]);
        this.setState({ editStation: editStation })
    }
    delete = () => {
        this.props.deleteStation(this.state.editStation.id)
        this.setState({ editStation: null, stationFormVisible: false })
    }
    render() {
        const { fetching, stations, resources } = this.props;
        const upStations = stations && stations.upStations && this.buildSteps(stations.upStations, 'upIndex');
        const downStations = stations && stations.downStations && this.buildSteps(stations.downStations, 'downIndex');
        return (
            <Spin spinning={fetching} >
                <BreadcrumbCustom first="线路" second="站点" />
                <Row>
                    <Row>上行</Row>
                    {
                        upStations ?
                            <Steps style={{ overflow: 'auto' }}
                                current={this.state.upIndex} size="small"
                                labelPlacement="vertical">
                                {upStations}
                            </Steps>
                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.showAddStation('UP')
                                    }}
                                >添加站点</Button>
                            </Empty>
                    }
                </Row>
                <Row>
                    <Row>下行</Row>
                    {
                        downStations ?
                            <Steps style={{ overflow: 'auto' }} current={this.state.downIndex} size="small" labelPlacement="vertical">
                                {downStations}
                            </Steps>
                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.showAddStation('DOWN')
                                    }}
                                >添加站点</Button>
                            </Empty>
                    }
                </Row>
                {
                    this.state.editStation ?
                        (
                            <Row gutter={24} type="flex" justify="start">
                                <Col span={3}>
                                    <Input
                                    defaultValue={this.state.editStation.name} 
                                    onBlur={(e)=>{this.change('name',e.target.value)}}/>
                                </Col>
                                <Col span={3}>
                                    <Button type="primary" onClick={this.delete}>
                                        <Icon type='remove' />
                                        删除站点
                                    </Button>
                                </Col>
                            </Row>)
                        : ''
                }
                <StationForm ref={this.saveFormRef}
                    visible={this.state.stationFormVisible}
                    change={this.change}
                    station={this.state.editStation}
                    resources={resources} />
                <AddForm
                    ref={this.saveAddStationFormRef}
                    visible={this.state.addStationForm}
                    onOk={this.addStation}
                    onCancel={() => this.setState({ addStationForm: false })} />
            </Spin>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['lineReducer', 'errorMsg']),
        fetching: state.getIn(['lineReducer', 'fetching']),
        stations: state.getIn(['lineReducer', 'stations']),
        addedStation: state.getIn(['lineReducer', 'addedStation']),
        currentStation: state.getIn(['lineReducer', 'currentStation']),
        resources: state.getIn(['resourceReducer', 'voices'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStations: (lineId) => {
            dispatch(fetchStations(lineId))
        },
        addStation: (lineId, station) => {
            dispatch(addStation(lineId, station))
        },
        deleteStation: (id) => {
            dispatch(deleteStation(id))
        },
        updateStationKey: (stationId, key, value) => {
            dispatch(updateStationKey(stationId, key, value))
        },
        fetchResources: () => {
            dispatch(fetchVoices())
        }
        // register: (orgId, account) => {
        //     dispatch(createAccount(orgId, account))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Station)

import React, { Component } from 'react';
import { Spin, Button, Modal, Input, Steps, Row, Icon, Form, Empty, Tabs } from 'antd';
import { fetchStations, syncLine, addStation, updateStationKey, deleteStation } from '../../redux/lines/lineActions';
import { fetchVoices } from '../../redux/resource/resActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { BaseForm, CoordinateForm, SwerveForm, EntryForm, ExitForm } from './StationForm';
import { success, error } from '../widget/Message';

const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const FormItem = Form.Item;

const AddForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form, continues } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                centered={true}
                visible={visible}
                title={'添加站点'}
                okText={continues ? '继续添加' : '保存'}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input onPressEnter={onOk} />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('description')(<Input onPressEnter={onOk} type="textarea" />)}
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
            stationFormVisible: false,
            continues: false
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
            if (this.state.seq !== -1) {
                values.seq = this.state.seq;
            }
            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            values.upOrDown = this.state.type;
            this.props.addStation(this.props.query.line, values);
            addStationForm.resetFields();
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
            return { submit: false, continues: true };
        }
        return null;
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
    change = (field, key, value) => {
        const editStation = this.state.editStation;
        editStation[field] = value;
        if (key === '') {
            this.props.updateStationKey(editStation.id, field, value);
        } else {
            this.props.updateStationKey(editStation.id, key, value.id);
        }
        this.setState({ editStation: editStation })
    }
    delete = () => {

        Modal.confirm({
            title: '提示',
            content: `确认删除站点"${this.state.editStation.name}"吗?`,
            onOk: () => {
                this.props.deleteStation(this.state.editStation.id)
                this.setState({ editStation: null, stationFormVisible: false })
            }
        })
    }
    insert = (type, seq) => {
        this.setState({ seq: seq });
        this.showAddStation(type);
    }
    syncLine = (orientation) => {
        this.props.syncLine(this.props.query.line, orientation);
    }
    render() {
        const { fetching, stations, resources, setting } = this.props;
        const upStations = stations && stations.upStations && this.buildSteps(stations.upStations, 'upIndex');
        const downStations = stations && stations.downStations && this.buildSteps(stations.downStations, 'downIndex');
        return (
            <Spin spinning={fetching} >
                <BreadcrumbCustom first="线路" second="站点" />
                <Row>
                    <Row>上行</Row>
                    {
                        upStations ?
                            (
                                <div>
                                    <Steps style={{ overflow: 'auto' }}
                                        current={this.state.upIndex} size="small"
                                        labelPlacement="vertical">
                                        {upStations}
                                    </Steps>
                                    <Button onClick={()=>{this.syncLine('UP')}}>
                                        同步下行
                                    </Button>
                                </div>
                            )
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
                            (
                                <div>
                                    <Steps style={{ overflow: 'auto' }} current={this.state.downIndex} size="small" labelPlacement="vertical">
                                        {downStations}
                                    </Steps>
                                    <Button onClick={()=>{this.syncLine('DOWN')}}>
                                        同步上行
                                    </Button>
                                </div>
                            )
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
                <Tabs>
                    <TabPane tab="基础信息" key="Base">
                        <BaseForm
                            deleteHandler={this.delete}
                            insertHandler={this.insert}
                            visible={this.state.stationFormVisible}
                            change={this.change}
                            station={this.state.editStation}
                            resources={resources}
                            setting={setting} />
                    </TabPane>
                    <TabPane tab="坐标" key="Coordinate">
                        <CoordinateForm
                            visible={this.state.stationFormVisible}
                            change={this.change}
                            station={this.state.editStation}
                            resources={resources}
                            setting={setting} />
                    </TabPane>
                    <TabPane tab="转弯信息" key="Swerve">
                        <SwerveForm
                            visible={this.state.stationFormVisible}
                            change={this.change}
                            station={this.state.editStation}
                            resources={resources}
                            setting={setting} />
                    </TabPane>
                    <TabPane tab="进站信息" key="Entry">
                        <EntryForm
                            visible={this.state.stationFormVisible}
                            change={this.change}
                            station={this.state.editStation}
                            resources={resources}
                            setting={setting} />
                    </TabPane>
                    <TabPane tab="出站信息" key="Exit">
                        <ExitForm
                            visible={this.state.stationFormVisible}
                            change={this.change}
                            station={this.state.editStation}
                            resources={resources}
                            setting={setting} />
                    </TabPane>
                </Tabs>
                <AddForm
                    ref={this.saveAddStationFormRef}
                    continues={this.state.continues}
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
        resources: state.getIn(['resourceReducer', 'voices']),
        setting: state.getIn(['orgReducer', 'setting'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStations: (lineId) => {
            dispatch(fetchStations(lineId))
        },
        syncLine: (lineId, orientation) => {
            dispatch(syncLine(lineId, orientation))
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Station)

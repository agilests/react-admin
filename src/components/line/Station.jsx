import React, { Component } from 'react';
import { Spin, Slider, Table, Button, Modal, Input, Steps, Row, Icon, Form, Divider, Col, Empty } from 'antd';
import { fetchStations } from '../../redux/lines/lineActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import StationForm from './StationForm';
const Step = Steps.Step;
class Station extends Component {
    constructor(props) {
        super(props);
        this.props.fetchStations(this.props.query.line);
        this.state = {
            upIndex: -1,
            downIndex: -1,
            editStation: null,
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
    }
    buildSteps = (stations, state) => {
        return stations.map(d =>
            <Step key={d.name} style={{ cursor: "pointer" }}
                title={d.name}
                onClick={(v) => {
                    let index = stations.findIndex(e => e.name === d.name);
                    this.setState({ upIndex: -1, downIndex: -1 })
                    this.setState({ [state]: index, editStation: stations[index] })
                }} />
        );
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        const { fetching, stations } = this.props;
        const upStations = stations && stations.upStations && this.buildSteps(stations.upStations, 'upIndex');
        const downStations = stations && stations.downStations && this.buildSteps(stations.downStations, 'downIndex');
        return (
            <Spin spinning={fetching} >
                <BreadcrumbCustom first="线路" second="站点" />
                <Row>
                    <Row>上行</Row>
                    {
                        upStations ?
                            <Steps progressDot style={{ overflow: 'auto' }} current={this.state.upIndex} size="small">
                                {upStations}
                            </Steps>
                            : <Empty />
                    }
                </Row>
                <Row>
                    <Row>下行</Row>
                    <Row>
                        {
                            downStations ?
                                <Steps style={{ overflow: 'auto' }} current={this.state.downIndex} size="small" labelPlacement="vertical">
                                    {downStations}
                                </Steps>
                                : <Empty />
                        }
                    </Row>
                </Row>
                <StationForm orgId={this.state.currentUser.orgId}/>
            </Spin>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['lineReducer', 'errorMsg']),
        fetching: state.getIn(['lineReducer', 'fetching']),
        stations: state.getIn(['lineReducer', 'stations'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStations: (lineId) => {
            dispatch(fetchStations(lineId))
        }
        // fetchAccounts: (orgId) => {
        //     dispatch(fetchAccounts(orgId))
        // },
        // register: (orgId, account) => {
        //     dispatch(createAccount(orgId, account))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Station)

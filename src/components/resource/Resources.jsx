import React, { Component } from "react";
import { fetchVoices } from '../../redux/resource/resActions';
import { fetchOrgs } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Tabs, Spin, Modal, Table, Form, Input, Button, Select, Popover  } from "antd";
import ResourceKeys from '../line/ResourceKeys'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange();
        } else {
            this.props.fetchOrgs();
        }
        this.voiceColumns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>,
            },
            {
                title: '类型',
                dataIndex: 'key',
                key: 'key',
                render: text => {
                    switch(text){
                        case ResourceKeys.ENTRY_AD:
                            return '进站广告'
                        default:
                            return '自定义'
                    }
                },
            }
        ]
    }
    onChange = (orgId) => {
        this.props.fetchVoices(orgId);
    }
    render() {
        const { voices, fetching, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);
        return (

            <div className="gutter-example button-demo">
                <Spin spinning={fetching}>
                    <BreadcrumbCustom first="线路" />
                    {
                        this.state.currentUser.role === 'ROLE_ADMIN'
                            ? <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入客户名称"
                                onChange={(v) => this.onChange(v)}
                            >
                                {options}
                            </Select>
                            : ''
                    }
                    <Tabs>
                        <TabPane tab="语音" key="voices">
                            <Table rowKey={'id'} columns={this.voiceColumns} dataSource={voices}/>
                        </TabPane>
                        <TabPane tab="广告" key="ads">
                            ads
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        voices:state.getIn(['resourceReducer','voices']),
        fetching:state.getIn(['resourceReducer','fetching']),
        orgs:state.getIn(['orgReducer','orgs'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchVoices: (orgId) => {
            dispatch(fetchVoices(orgId))
        },
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources)
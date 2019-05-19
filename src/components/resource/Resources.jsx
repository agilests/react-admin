import React, { Component } from "react";
import { fetchVoices } from '../../redux/resource/resActions';
import { fetchOrgs, fetchSetting, updateSetting } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Tabs, Spin, Modal, Table, Form, Input, Button, Select, Popover } from "antd";
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
                render: text => this.displayName(text),
            },
            {
                title: '是否默认',
                dataIndex: 'key',
                key: 'key',
                render: (text, record) => {
                    if (this.isDefault(record)) {
                        return '默认' + this.displayName(text);
                    }
                    return '';
                }
            },
            {
                title: 'action',
                dataIndex: 'action',
                key: 'key',
                render: (text, record) => {
                    if (!this.isDefault(record)) {
                        return (
                            this.state.currentUser.role !== 'ROLE_ADMIN' &&
                            <Button onClick={() => {this.updateSetting(record) }}>
                                设为默认{this.displayName(record.key)}
                            </Button>
                        )
                    }
                    return ''
                }
            }

        ]
    }
    updateSetting = (record) => {
        const key = this.resolveKey(record.key);
        this.props.updateOrgSetting(this.state.currentUser.orgId,key,{value:record.id});
    }
    displayName = (text) => {

        switch (text) {
            case ResourceKeys.ENTRY_AD:
                return '进站广告'
            default:
                return '自定义'
        }
    }
    resolveKey = (key) => {

        switch (key) {
            case ResourceKeys.ENTRY_AD:
                return 'defaultEntryAd'
            default:
                return ''
        }
    }
    isDefault = (record) => {
        if (!this.props.setting)
            return false;
        for (let k in this.props.setting) {
            if (this.props.setting[k] && record.id === this.props.setting[k].id)
                return true;
        }
        return false;
    }
    getSetting = (orgId) => {
        this.props.fetchOrgSetting(orgId);
    }
    onChange = (orgId) => {
        this.props.fetchVoices(orgId);
        if (orgId) {
            this.getSetting(orgId);
        } else {
            this.getSetting(this.state.currentUser.orgId);
        }
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
                            <Table rowKey={'id'} columns={this.voiceColumns} dataSource={voices} />
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
        voices: state.getIn(['resourceReducer', 'voices']),
        fetching: state.getIn(['resourceReducer', 'fetching']),
        setting: state.getIn(['orgReducer', 'setting']),
        orgs: state.getIn(['orgReducer', 'orgs'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchVoices: (orgId) => {
            dispatch(fetchVoices(orgId))
        },
        fetchOrgSetting: (orgId) => {
            dispatch(fetchSetting(orgId))
        },
        updateOrgSetting: (orgId, key, value) => {
            dispatch(updateSetting(orgId, key, value))
        },
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources)
import React, { Component } from "react";
import { fetchVoices } from '../../redux/resource/resActions';
import { fetchSetting, updateSetting } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Tabs, Spin, Modal, Table, Form, Input, Button, Select, Popover, Switch } from "antd";
import ResourceKeys from '../line/ResourceKeys'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const SettingForm = Form.create()(
    (props) => {
        const { visible, resource, onOk, onCancel, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={'设置'}
                okText={'确认'}
                onOk={onOk}
                onCancel={onCancel}
            >
                {
                    resource &&
                    <Form layout="vertical">
                        <FormItem label="默认进站音乐">
                            {getFieldDecorator('defaultEntryMusic')(
                                <Switch defaultChecked={resource.defaultEntryMusic != null} />
                            )}
                        </FormItem>
                        <FormItem label="默认出站音乐">
                            {getFieldDecorator('defaultExitMusic')(
                                <Switch defaultChecked={resource.defaultExitMusic != null} />
                            )}
                        </FormItem>
                        <FormItem label="默认转弯音乐">
                            {getFieldDecorator('defaultSwerveMusic')(
                                <Switch defaultChecked={resource.defaultSwerveMusic != null} />
                            )}
                        </FormItem>
                    </Form>
                }
            </Modal>
        )
    }
)

class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange();
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
                dataIndex: 'isDefault',
                key: 'isDefault',
                render: (text, record) => {
                    if (this.isDefault(record)) {
                        return '是'
                    }
                    return '否';
                }
            },
            {
                title: 'action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    if (!this.isDefault(record)) {
                        return (
                            this.state.currentUser.role !== 'ROLE_ADMIN' &&
                            <Button onClick={() => { this.openSetting(record) }}>
                                设为默认
                            </Button>
                        )
                    }
                    return ''
                }
            }

        ]
    }
    openSetting = (record) => {
        // const key = this.resolveKey(record.key);
        // this.props.updateOrgSetting(this.state.currentUser.orgId,key,{value:record.id});
        if (record.key === ResourceKeys.ENTRY_MUSIC
            || record.key === ResourceKeys.ENTRY_AD
            || record.key === ResourceKeys.ENTRY_HINT
            || record.key === ResourceKeys.EXIT_MUSIC
            || record.key === ResourceKeys.EXIT_AD
            || record.key === ResourceKeys.EXIT_HIST
            || record.key === ResourceKeys.ANGLE_MUSIC) {
            this.setState({ settingFormVisible: true, resource: record })
        }
    }
    closeSetting = () => {
        this.setState({ settingFormVisible: false, resource: null })
    }
    updateSetting = () => {

        const form = this.settingForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            // this.setState({ submit: true })
            // this.props.createOrg(values);
        });
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
        }
    }
    saveFormRef = (form) => {
        this.settingForm = form;
    };

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
                            <Table rowKey='id' columns={this.voiceColumns} dataSource={voices} />
                            <SettingForm
                                ref={this.saveFormRef}
                                visible={this.state.settingFormVisible}
                                resource={this.state.resource}
                                onOk={this.updateSetting}
                                onCancel={this.closeSetting} />
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources)
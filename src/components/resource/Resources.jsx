import React, { Component } from "react";
import { fetchVoices } from '../../redux/resource/resActions';
import { fetchSetting, updateSetting } from '../../redux/org/orgActions';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Tabs, Spin, Modal, Table, Form, Input, Button, Select, Popover, Switch, Row, Col } from "antd";
import { success, error } from '../widget/Message';
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
                    <Form layout='horizontal'>
                        <Row>
                            <Col span={8}>
                                <FormItem label="默认进站音乐">
                                    {getFieldDecorator('defaultEntryMusic')(
                                        <Switch defaultChecked={resource.defaultEntryMusic} />
                                    )}
                                </FormItem>
                                <FormItem label="默认进站广告">
                                    {getFieldDecorator('defaultEntryAd')(
                                        <Switch defaultChecked={resource.defaultEntryAd} />
                                    )}
                                </FormItem>
                                <FormItem label="默认进站提醒">
                                    {getFieldDecorator('defaultEntryHint')(
                                        <Switch defaultChecked={resource.defaultEntryHint} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="默认出站音乐">
                                    {getFieldDecorator('defaultExitMusic')(
                                        <Switch defaultChecked={resource.defaultExitMusic} />
                                    )}
                                </FormItem>
                                <FormItem label="默认出站广告">
                                    {getFieldDecorator('defaultExitAd')(
                                        <Switch defaultChecked={resource.defaultExitAd} />
                                    )}
                                </FormItem>
                                <FormItem label="默认出站提醒">
                                    {getFieldDecorator('defaultExitHint')(
                                        <Switch defaultChecked={resource.defaultExitHint} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="默认转弯音乐">
                                    {getFieldDecorator('defaultSwerveMusic')(
                                        <Switch defaultChecked={resource.defaultSwerveMusic} />
                                    )}
                                </FormItem>
                                <FormItem label="默认转弯提醒">
                                    {getFieldDecorator('defaultSwerveHint')(
                                        <Switch defaultChecked={resource.defaultSwerveHint} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
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
                title: '资源文件',
                dataIndex: 'files',
                key: 'files',
                render: text => <span>{text}</span>
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    this.state.currentUser.role !== 'ROLE_ADMIN' &&
                    <Button onClick={() => { this.openSetting(record) }}>
                        设为默认
                            </Button>
                )

            }

        ]
    }
    openSetting = (record) => {
        // const key = this.resolveKey(record.key);
        // this.props.updateOrgSetting(this.state.currentUser.orgId,key,{value:record.id});
        let res = { id: record.id };
        if (this.props.setting) {
            if (this.props.setting.defaultEntryMusic && this.props.setting.defaultEntryMusic.id === record.id) {
                res.defaultEntryMusic = true;
            }
            if (this.props.setting.defaultEntryAd && this.props.setting.defaultEntryAd.id === record.id) {
                res.defaultEntryAd = true;
            }
            if (this.props.setting.defaultEntryHint && this.props.setting.defaultEntryHint.id === record.id) {
                res.defaultEntryHint = true;
            }
            if (this.props.setting.defaultExitMusic && this.props.setting.defaultExitMusic.id === record.id) {
                res.defaultExitMusic = true;
            }
            if (this.props.setting.defaultExitAd && this.props.setting.defaultExitAd.id === record.id) {
                res.defaultExitAd = true;
            }
            if (this.props.setting.defaultExitHint && this.props.setting.defaultExitHint.id === record.id) {
                res.defaultExitHint = true;
            }
            if (this.props.setting.defaultSwerveMusic && this.props.setting.defaultSwerveMusic.id === record.id) {
                res.defaultSwerveMusic = true;
            }
            if (this.props.setting.defaultSwerveHint && this.props.setting.defaultSwerveHint.id === record.id) {
                res.defaultSwerveHint = true;
            }
        }
        this.setState({ settingFormVisible: true, resource: res })
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

            let submit = {};
            for (let k in values) {
                if (values[k]) {
                    submit[k] = this.state.resource.id;
                }
            }
            console.log('Received values of form: ', submit);
            this.setState({ submit: true })
            this.props.updateOrgSetting(this.state.currentUser.orgId, submit);
        });
    }


    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg } = nextProps;
        const { submit } = nextState;
        if (submit) {
            if (errorMsg) {
                debugger;
                error(errorMsg);
                return { submit: false };
            } else {
                success('设置成功!')
                return { settingFormVisible: false, submit: false };
            }
        }
        return null;
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
        updateOrgSetting: (orgId, value) => {
            dispatch(updateSetting(orgId, value))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources)
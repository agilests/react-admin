import React, { Component } from 'react';
import { Spin, Modal, Table, Form, Input, Button, Select } from 'antd';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { fetchLines, createLine, deleteLine } from '../../redux/lines/lineActions';
import { fetchOrgs } from '../../redux/org/orgActions';
import { success, error } from '../widget/Message';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;



const LineForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form, fetching } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={'编辑线路'}
                okText={'保存'}
                onOk={onOk}
                onCancel={onCancel}
                confirmLoading={fetching}
            >
                <Form layout="vertical">
                    <FormItem label="线路名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入线路名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('desc')(<Input type="textarea" />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

class Lines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentUser: JSON.parse(localStorage.getItem('currentUser'))
        }
        this.columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        }, {
            title: '站点',
            dataIndex: 'stations',
            key: 'stations',
            render: text => <span>{text ? text.length : 0}</span>,
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.props.history.push(`/app/stations?line=${record.id}`)}>线路规划</Button>
                    <Button onClick={() => this.showEdit(record)}>编辑</Button>
                    <span className="ant-divider" />
                    <Button onClick={() => { this.deleteLine(record) }}>删除</Button>
                    <span className="ant-divider" />
                </span>
            ),
        }];
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange(this.state.currentUser.orgId);
        } else {
            this.props.fetchOrgs();
        }
    }

    deleteLine = (record) => {
        Modal.confirm({
            title: '提示',
            content: `确认删除线路"${record.name}"吗?`,
            onOk: () => {
                this.props.deleteLine(record.id);
            }
        })
    }
    addLine = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            this.props.createLine(this.state.currentUser.orgId, values);
        });
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        const { errorMsg, added } = nextProps;
        const { submit } = nextState;
        if (submit && errorMsg != '') {
            error(errorMsg);
            return { submit: false };
        } else if (submit && added && Object.keys(added).length != 0) {
            // success('添加线路成功!')
            Modal.confirm({
                title: '提示',
                content: '线路添加成功,是否开始规划站点?',
                onOk: () => {
                    nextProps.history.push(`/app/stations?line=${added.id}`)
                }
            })
            return { visible: false, submit: false };
        }
        return null;
    }
    showDialog = () => {
        this.setState({ visible: true });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    onChange = (orgId) => {
        this.props.fetchLines(orgId);
    }
    render() {
        const { lines, fetching, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);

        return (
            <div className="gutter-example button-demo">
                <Spin spinning={fetching}>
                    <BreadcrumbCustom first="线路" />

                    {

                        this.state.currentUser.role==='ROLE_ADMIN'
                            ? <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入客户名称"
                                onChange={(v) => this.onChange(v)}
                            >
                                {options}
                            </Select>
                            : <Button onClick={() => this.showDialog()}>添加线路</Button>
                    }


                    <Table columns={this.columns} dataSource={lines} />

                    <LineForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        fetching={fetching}
                        onOk={this.addLine}
                        onCancel={() => { this.setState({ visible: false }) }}
                    />
                </Spin>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['lineReducer', 'errorMsg']),
        orgs: state.getIn(['orgReducer', 'orgs']),
        added: state.getIn(['lineReducer', 'added']),
        lines: state.getIn(['lineReducer', 'lines'], []),
        fetching: state.getIn(['lineReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchLines: (orgId) => {
            dispatch(fetchLines(orgId))
        },
        createLine: (orgId, line) => {
            dispatch(createLine(orgId, line))
        },
        deleteLine: (id) => {
            dispatch(deleteLine(id))
        },
        fetchOrgs: () => {
            dispatch(fetchOrgs())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lines)
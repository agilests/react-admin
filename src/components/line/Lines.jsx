import React, { Component } from 'react';
import { Spin, Modal, Table, Form, Input, Button, Select, Popover } from 'antd';
import { connect } from '../../connect'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { fetchLines, createLine, updateLine, deleteLine } from '../../redux/lines/lineActions';
import { success, error } from '../widget/Message';

const FormItem = Form.Item;
const Option = Select.Option;



const LineForm = Form.create()(
    (props) => {
        const { visible, onOk, onCancel, form, fetching, editLine } = props;
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
                            initialValue: editLine ? editLine.name : '',
                            rules: [{ required: true, message: '请输入线路名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('desc', {
                            initialValue: editLine ? editLine.desc : '',
                        })(<Input type="textarea" />)}
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
            dataIndex: 'downStations',
            key: 'stations',
            render: (e, record) => {
                const upStations = record.upStations;
                const downStations = record.downStations;
                let length = 0;
                if (upStations) {
                    length += upStations.length;
                }
                if (downStations) {
                    length += downStations.length;
                }
                const content = (
                    <div>
                        <div>
                            {
                                upStations && upStations.map(s => <span key={s.id} style={{width:'20px',marginRight:'10px'}}><span>{s.name}</span><span className="ant-divider"/></span>)
                            }
                        </div>
                        <div>
                            {
                                downStations && downStations.map(s => <span key={s.id} style={{width:'20px',marginRight:'10px'}}><span>{s.name}</span><span className="ant-divider"/></span>)
                            }
                        </div>
                    </div>
                )
                return (
                    <Popover content={content}>
                        <span>{length}</span>
                    </Popover>
                )
            },
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.props.history.push(`/app/stations?line=${record.id}`)}>线路规划</Button>
                    <Button onClick={() => this.showEdit(record)}>编辑</Button>
                    <Button onClick={() => { this.deleteLine(record) }}>删除</Button>
                </span>
            ),
        }];
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.onChange();
        }
    }
    showEdit = (record) => {
        this.setState({ editLine: record, visible: true })
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
            this.props.createLine(values);
        });
    }
    editLine = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.setState({ submit: true })
            values.id = this.state.editLine.id;
            this.props.updateLine(values);
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
                content: '线路保存成功,是否开始规划站点?',
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

                        this.state.currentUser.role === 'ROLE_ADMIN'
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


                    <Table columns={this.columns} rowKey='id' dataSource={lines} />

                    <LineForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        editLine={this.state.editLine}
                        fetching={fetching}
                        onOk={this.state.editLine ? this.editLine : this.addLine}
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
        createLine: (line) => {
            dispatch(createLine(line))
        },
        updateLine: (line) => {
            dispatch(updateLine(line))
        },
        deleteLine: (id) => {
            dispatch(deleteLine(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lines)
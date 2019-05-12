import React from 'react';
import { Spin, Modal, Table, Form, Input, Button, Select, Icon } from 'antd';
import { fetchLogs, } from '../../redux/logs/logAction';
import { connect } from '../../connect'
import { Link } from 'react-router-dom';
import BreadcrumbCustom from '../BreadcrumbCustom';
import TimeToDate from '../utils/Time2Date';
const Option = Select.Option;

class Logs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            currentPage: 0,
        }
        this.columns = [{
            title: '操作',
            dataIndex: 'op',
            key: 'op',
            render: text => <span>{text}</span>,
        }, {
            title: '操作时间',
            dataIndex: 'created',
            key: 'created',
            render: text => <span>{TimeToDate(text)}</span>
        }, {
            title: '操作人',
            dataIndex: 'acc',
            key: 'acc',
        }, {
            title: '是否成功',
            dataIndex: 's',
            key: 's',
            render: text => <span>{text === 1 ? '成功' : '失败'}</span>
        }, {
            title: '失败原因',
            dataIndex: 'reason',
            key: 'reason'
        }];

        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.props.fetchLogs(0, this.state.currentUser.orgId)
        }
    }
    onChange = (orgId) => {
        this.setState({ currentPage: 0, currentOrg: orgId })
        this.props.fetchLogs(this.state.currentPage, orgId);
    }
    load = (page) => {
        this.setState({ currentPage: page-1 })
        if (this.state.currentUser.role !== 'ROLE_ADMIN') {
            this.props.fetchLogs(page-1, this.state.currentUser.orgId);
        } else {
            this.props.fetchLogs(page-1, this.state.currentOrg);
        }
    }
    render() {
        const { logs, fetching, orgs } = this.props;
        const options = orgs.map(d => <Option key={d.id}>{d.name}</Option>);
        console.log(logs);
        return (

            <div className="gutter-example button-demo">
                <Spin spinning={fetching}>
                    <BreadcrumbCustom first="日志" />
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

                    <Table rowKey={'id'}
                        columns={this.columns}
                        pagination={{
                            hideOnSinglePage: false,
                            showTotal: (total, range) => { console.log("total:" + total + ",range:" + range) },
                            onChange: this.load,
                            // current: this.state.currentPage,
                            total: logs.totalElements,
                        }}
                        dataSource={logs.content} />
                </Spin>
            </div>
        )
    }
}



const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['logReducer', 'errorMsg']),
        logs: state.getIn(['logReducer', 'logs'], []),
        fetching: state.getIn(['logReducer', 'fetching']),
        orgs: state.getIn(['orgReducer', 'orgs'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogs: (page, orgId) => {
            dispatch(fetchLogs(page, orgId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
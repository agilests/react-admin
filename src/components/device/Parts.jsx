import React, { Component } from 'react';
import { Modal, Table, Button, Icon, Layout, Menu, Divider } from 'antd';
import { fetchParts } from '../../redux/sign/signActions';
import { connect } from '../../connect'
import { success, error } from '../widget/Message';
const { Sider, Content, Header } = Layout;


class Parts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partsCollapsed: false,
            propertiesCollapsed: false
        }
        this.props.fetchParts(this.props.query.sign)
    }
    toggle = (props) => {
        this.setState({ [props]: !this.state[props] })
    }
    deletePart = () => {
        Modal.confirm({
            title: '提示',
            content: `确认删除分区吗?`,
            onOk: () => {
                // this.props.deleteLine(record.id);
            }
        })
    }
    createPart = () => {

    }
    render() {
        const { parts } = this.props;
        return (
            <Layout>
                <Sider collapsedWidth={30} trigger={null} collapsible collapsed={this.state.partsCollapsed}
                    style={{ background: 'white', width: 80, height: 'auto', borderRight: '1px inset' }}>
                    <Icon
                        className="partition__trigger"
                        type={this.state.partsCollapsed ? 'menu-unfold' : 'menu-fold'}
                        style={{ lineHeight: '34px' }}
                        onClick={() => this.toggle('partsCollapsed')}
                    />
                    <Menu
                        theme="light"
                        mode="inline"
                        onClick={this.createPart}
                        style={{ color:'white',display: this.state.partsCollapsed ? 'none' : 'block' }} >
                        <Menu.Item key={'add'}><Icon type="plus" />{'添加分区'}</Menu.Item>
                        {
                            parts && parts.map(s => <Menu.Item key={s.id}>
                                <span>{s.name}</span>
                            </Menu.Item>)
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: 'white', height: '250px', borderBottom: '1px inset' }}>
                        <Divider orientation="left">预览</Divider>
                        <div style={{ height: 20, width: 20, position: 'absolute', background: 'red' }}></div>
                    </Header>
                    <Content>

                    </Content>
                </Layout>
                <Sider collapsedWidth={1} collapsed={this.state.propertiesCollapsed} style={{ background: 'white', height: 'auto', borderLeft: '1px inset' }}>
                    <Icon
                        className="partition__trigger"
                        type={this.state.propertiesCollapsed ? 'menu-fold' : 'menu-unfold'}
                        style={{ lineHeight: '34px' }}
                        onClick={() => this.toggle('propertiesCollapsed')}
                    />
                    sider
                </Sider>
            </Layout>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['signReducer', 'errorMsg']),
        parts: state.getIn(['signReducer', 'parts'], []),
        added: state.getIn(['signReducer', 'added']),
        fetching: state.getIn(['signReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchParts: (signId) => {
            dispatch(fetchParts(signId))
        },
        // deleteDevice: (id) => {
        //     dispatch(deleteDevice(id))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Parts)

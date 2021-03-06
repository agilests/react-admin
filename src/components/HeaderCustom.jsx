import React, { Component } from 'react';
import screenfull from 'screenfull';
// import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover } from 'antd';
import { queryString } from '../utils';
import { PwaInstaller } from './widget';
import { logout } from '../redux/user/userActions';
import { connect } from '../connect'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };
    componentDidMount() {
        const QueryString = queryString();
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
        } else {
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('currentUser');
        this.props.logout();
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        const { responsive = { data: {} }, path } = this.props;
        return (
            <Header className="custom-theme header" >
                {
                    <Icon
                        className="header__trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        style={{lineHeight: '34px'}}
                        onClick={this.props.toggle}
                    />
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '34px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller />
                    </Menu.Item>
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item> */}
                    <SubMenu title={<span className="avatar">{this.props.user.account}
                        {/* <img src={avater} alt="头像" /><i className="on bottom b-white" /> */}
                    </span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.user.account}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom)
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
// import { connectAlita } from 'redux-alita';

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        title: ''
    };
    componentWillMount() {
    }
    componentDidMount() {
        const openNotification = () => {
            notification.open({
              message: '博主-yezihaohao',
              description: (
                  <div>
                      <p>
                          GitHub地址： <a href="https://github.com/yezihaohao" target="_blank" rel="noopener noreferrer">https://github.com/yezihaohao</a>
                      </p>
                      <p>
                          博客地址： <a href="https://yezihaohao.github.io/" target="_blank" rel="noopener noreferrer">https://yezihaohao.github.io/</a>
                      </p>
                  </div>
              ),
              icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
              duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    getClientWidth = () => {
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;

        const user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        if(!user){
            return <Redirect to={'/login'} />;
        }else{
            return (
                <DocumentTitle title={title}>
                    <Layout>
                        <SiderCustom collapsed={this.state.collapsed} user={user}/>
                        <ThemePicker />
                        <Layout style={{flexDirection: 'column'}}>
                            <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={user} history={this.props.history}/>
                            <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                                <Routes user={user} />
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                            React-Admin ©{new Date().getFullYear()} Created by 865470087@qq.com
                            </Footer>
                        </Layout>
                    </Layout>
                </DocumentTitle>
            );
        }
    }
}

const mapStateToProps = (state, props) => {
    const currentUser = state.getIn(['userReducer', 'currentUser']) || {}
    const orgId = currentUser ? currentUser.orgId : null
    const userId = currentUser.id
    return {
        orgId,
        userId,
        currentUser,
    }
}

export default connect(mapStateToProps)(App)
// export default connectAlita(['auth', 'responsive'])(App);

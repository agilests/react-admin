
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { PwaInstaller } from '../widget';
import {login} from '../../redux/user/userActions';
import { connect } from '../../connect'
import { debug } from 'util';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            logining:false,
            loginMsg:'',
            auth:''
        }
    }
    componentDidMount() {
        // const { setAlitaState } = this.props;
        // setAlitaState({ stateName: 'auth', data: null });
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { currentUser, history } = this.props;
        if (currentUser ) { // 判断是否登陆
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            history.push('/app/dashboard/index');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username,this.state.password);
    };
    _handleInputChange = (prop) => (input)=>{
        this.setState({[prop]: input.target.value})
    }
    render() {
        // const { getFieldD/ecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin{this.props.loginMsg}</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {/* {getFieldDecorator('userName', { */}
                                {/* rules: [{ required: true, message: '请输入用户名!' }], */}
                            {/* })( */}
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" onChange={this._handleInputChange('username')}/>
                            {/* )} */}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('password', { */}
                                {/* rules: [{ required: true, message: '请输入密码!' }], */}
                            {/* })( */}
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" onChange={this._handleInputChange('password')}/>
                            {/* )} */}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })( */}
                                <Checkbox>记住我</Checkbox>
                            {/* )} */}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            {/* <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p> */}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loginMsg: state.getIn(['userReducer', 'loginMsg']),
        currentUser: state.getIn(['userReducer','currentUser'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => {
            dispatch(login({'username':username, 'password':password}))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
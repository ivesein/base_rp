import React, { Component,Fragment } from 'react'
import styles from "./index.module.scss"
import { Form, Input, Button ,Row, Col} from 'antd';
import { UserOutlined, LockOutlined,KeyOutlined } from '@ant-design/icons';
import {withRouter} from "react-router-dom"
import {login} from "@/api/login"
// import { validate_password } from '../../utils/validate'

class LoginForm extends Component {
    state={
        btn_text:"获取验证码",
        code_disabled:false,
        login_loading:false
    }
    formRef = React.createRef();
    goRegist=()=>{
        this.props.changeType(2)
    }
    getCode=()=>{
        this.setState({
            code_disabled:true
        })
        let countdown=60
        this.timer=setInterval(()=>{
            if(countdown>0){
                countdown--
                this.setState({
                    btn_text:countdown+""
                })
            }else{
                clearInterval(this.timer)
                this.setState({
                    btn_text:"重新获取"
                })
                this.setState({
                    code_disabled:false
                })
            }
        },1000)
    }
    onFinish = (values) => {
        console.log(values);
        this.setState({login_loading:true})
        login(values).then(res=>{
            console.log(res);
            localStorage.setItem("token",res.token||"123")
            this.props.history.push("/home")
        }).catch(err=>{
            this.setState({login_loading:false})
            console.log(err);
        })
      };

    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render() {
        const { login_loading } = this.state;
        return (
            <Fragment>
                <div className={styles["form-wrap"]}>
                    <div className={styles["form-header"]}>
                    <span className={styles["left-text"]}>登录</span>
                    <span onClick={this.goRegist} className={styles["right-text"]}>账号注册</span>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        ref={this.formRef}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="verifycode"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <Row justify="start" gutter={12}>
                        <Col span={16}>
                            <Input
                            prefix={<KeyOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="验证码"
                            />
                        </Col>
                        <Col span={8}><Button disabled={this.state.code_disabled} onClick={this.getCode} type="primary" danger className="login-form-button" block>
                        {this.state.btn_text}
                        </Button></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button  loading={login_loading} type="primary" htmlType="submit" className="login-form-button" block>
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(LoginForm)
import React, { Component,Fragment } from 'react'
import styles from "./index.module.scss"
import { Form, Input, Button ,Row, Col} from 'antd';
import { UserOutlined, LockOutlined ,KeyOutlined} from '@ant-design/icons';

export default class RegistForm extends Component {
    goLogin=()=>{
        this.props.changeType(1)
    }
    render() {
        return (
            <Fragment>
                <div className={styles["form-wrap"]}>
                    <div className={styles["form-header"]}>
                    <span className={styles["left-text"]}>账号注册</span>
                    <span onClick={this.goLogin} className={styles["right-text"]}>登录</span>
                    </div>
                    <Form
                    name="normal_login"
                    className="login-form"
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
                        name="password1"
                        rules={[{ required: true, message: '请再次输入密码!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="确认密码"
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
                        <Col span={8}><Button type="primary" danger className="login-form-button" block>
                        获取验证码
                        </Button></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                        注册
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

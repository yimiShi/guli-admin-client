import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import logo from './images/logo.png'
import './login.css'

export default class Login extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		alert('表单提交')
	}

	render() {
		const Item = Form.Item
		return (
			<div className="login">
				<div className="login-header">
					<img src={logo} alt="logo" />
					<h1>后台管理系统</h1>
				</div>
				<div className="login-content">
					<h1>用户登录</h1>

					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
							/>
						</Item>

						<Item>
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
							/>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登 陆
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

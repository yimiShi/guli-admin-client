import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import logo from './images/logo.png'
import './login.css'

class Login extends Component {
	handleSubmit = (e) => {
		e.preventDefault()

		//拿到相关的输入数据
		// const form = this.props.form
		// const values = form.getFieldsValue()
		// const username = form.getFieldValue('username')
		// const password = form.getFieldValue('password')
		// console.log(values, username, password)

		this.props.form.validateFields((err, { username, password }) => {
			if (!err) {
				alert(`发送登录的ajax请求, username=${username}, password=${password}`)
			} else {
				alert('验证失败')
			}
		})
	}

	validator = (rule, value, callback) => {
		value = value.trim()
		if (!value) {
			callback('密码不能为空')
		} else if (value.length < 4) {
			callback('密码不能小于4位')
		} else if (value.length > 12) {
			callback('密码不能大于12位')
		} else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
			callback('密码必须是数字字母下划线')
		} else {
			callback()
		}
	}

	render() {
		const Item = Form.Item
		const { getFieldDecorator } = this.props.form

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
							{getFieldDecorator('username', {
								rules: [
									{ required: true, message: '用户名不能为空' },
									{ min: 4, message: '用户名不能小于4位' },
									{ max: 12, message: '用户名不能大于12位' },
									{ pattern: /^[a-zA-Z0-9_]+$/, message: '必须为数字, 字母,下划线' },
								],
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Username"
								/>
							)}
						</Item>

						<Item>
							{getFieldDecorator('password', {
								rules: [{ validator: this.validator }],
							})(
								<Input
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
								/>
							)}
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

const WrapperForm = Form.create()(Login)
export default WrapperForm

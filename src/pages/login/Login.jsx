import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api'
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

		this.props.form.validateFields(async (err, { username, password }) => {
			if (!err) {
				// alert(`发送登录的ajax请求, username=${username}, password=${password}`)
				const result = await reqLogin(username, password)
				// 登录成功和失败处理
				if (result.status === 0) {
					// 将user信息保存到localstorage中
					const user = result.data
					// 保存到local中
					storageUtils.saveToLocal('user_key', user)
					// 保存到内存中
					memoryUtils.user = user

					// 跳到管理页面
					this.props.history.replace('/')
					message.success('登录成功')
				} else {
					message.error(result.msg)
				}
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
		const user = memoryUtils.user
		if (user._id) {
			return <Redirect to="/" />
		}
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

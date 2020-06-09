import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
	render() {
		// 读取保存的user, 如果不存在, 直接跳到登录页面
		// const user = storageUtils.getFromLocal('user_key')
		const user = memoryUtils.user
		if (!user._id) {
			// this.props.history.replace('/login')
			return <Redirect to="/login" />
		}
		return (
			<div>
				<h2>hello ,{user.username}</h2>
			</div>
		)
	}
}

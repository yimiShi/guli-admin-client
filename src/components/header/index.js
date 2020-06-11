import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../../components/link-button'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api'
import './index.css'

class Header extends Component {
	state = {
		currentTime: formateDate(Date.now()),
		dayPictureUrl: '',
		weather: '',
	}
	/**
	 * 退出登陆
	 */
	logout = () => {
		// 显示确认提示
		Modal.confirm({
			title: '确认退出登陆吗?',
			onOk: () => {
				console.log('ok')
				// 确认后, 删除存储的用户信息
				// local
				storageUtils.removeFromLocal('user_key')
				// 内存中
				memoryUtils.user = {}
				// 跳到登陆页面
				this.props.history.replace('/login')
			},
			onCancel() {},
		})
	}

	getTitle = () => {
		let title = ''
		const path = this.props.location.pathname

		menuList.forEach((item) => {
			if (item.key === path) {
				title = item.title
			} else if (item.children) {
				const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
				if (cItem) {
					title = cItem.title
				}
			}
		})
		return title
	}

	/**
	 * 获取天气信息
	 */
	getWeather = async () => {
		const { dayPictureUrl, weather } = await reqWeather('北京')
		this.setState({ dayPictureUrl, weather })
	}

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState({ currentTime: formateDate(Date.now()) })
		}, 1000)

		//获取天气
		this.getWeather()
	}

	componentWillUnmount() {
		clearInterval(this.intervalId)
	}

	render() {
		const { currentTime, dayPictureUrl, weather } = this.state
		const user = memoryUtils.user
		return (
			<div className="header">
				<div className="header-top">
					欢迎, {user.username}
					{/* <a href="jacascript:;" onClick={this.logout}>退出</a>*/}
					<LinkButton onClick={this.logout}>退出</LinkButton>
				</div>
				<div className="header-bottom">
					<div className="header-bottom-left">{this.getTitle()}</div>
					<div className="header-bottom-right">
						<span>{currentTime}</span>
						<img src={dayPictureUrl} alt="weather" />
						<span>{weather}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Header)

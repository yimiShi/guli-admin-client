import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.css'

const { SubMenu } = Menu

class LeftNav extends Component {
	getMenuNodes = (menuList) => {
		let path = this.props.location.pathname
		// return menuList.map((item) => {
		// 	if (!item.children) {
		// 		return (
		// 			<Menu.Item key={item.key}>
		// 				<Link to={item.key}>
		// 					<Icon type={item.icon} />
		// 					<span>{item.title}</span>
		// 				</Link>
		// 			</Menu.Item>
		// 		)
		// 	} else {
		// 		return (
		// 			<SubMenu
		// 				key={item.key}
		// 				title={
		// 					<span>
		// 						<Icon type={item.icon} />
		// 						<span>{item.title}</span>
		// 					</span>
		// 				}
		// 			>
		// 				{this.getMenuNodes(item.children)}
		// 			</SubMenu>
		// 		)
		// 	}
		// })

		return menuList.reduce((pre, item) => {
			if (!item.children) {
				pre.push(
					<Menu.Item key={item.key}>
						<Link to={item.key}>
							<Icon type={item.icon} />
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				let cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
				if (cItem) {
					this.openKey = item.key
				}

				pre.push(
					<SubMenu
						key={item.key}
						title={
							<span>
								<Icon type={item.icon} />
								<span>{item.title}</span>
							</span>
						}
					>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				)
			}
			return pre
		}, [])
	}

	// 第一次render() 启动定时器, 之后执行一次, ajax请求, 启动定时器
	componentDidMount() {}

	// 第一次render()之前执行一次, 为第一次render做一些同步准备, 准备元素等
	UNSAFE_componentWillMount() {
		this.menuNodes = this.getMenuNodes(menuList)
	}

	render() {
		// 当前的路由路径
		let selectKey = this.props.location.pathname

		// 多级路由时的颜色显示bug修复
		if (selectKey.startsWith('/product')) {
			selectKey = selectKey.split('/').slice(0, 2).join('/')
		}

		console.log('left-nav', selectKey)

		return (
			<div className="left-nav">
				<Link className="left-nav-link" to="/">
					<img src={logo} alt="logo" />
					<h1>硅谷后台</h1>
				</Link>

				<Menu selectedKeys={[selectKey]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
					{/* <Menu defaultSelectedKeys={[selectKey]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark"> */}
					{this.menuNodes}
					{/* <Menu.Item key="/home">
						<Link to="/home">
							<Icon type="home" />
							<span>首页</span>
						</Link>
					</Menu.Item>

					<SubMenu
						key="products"
						title={
							<span>
								<Icon type="mail" />
								<span>商品</span>
							</span>
						}
					>
						<Menu.Item key="/category">
							<Link to="/category">
								<Icon type="folder-open" />
								<span>品类管理</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="/product">
							<Link to="/product">
								<Icon type="filter" />
								<span>商品管理</span>
							</Link>
						</Menu.Item>
					</SubMenu> */}
				</Menu>
			</div>
		)
	}
}

/**
 * 向外暴露, 使用高阶组件withRouter() 来包装非路由组件
 * 新组件向leftNav传递3个特别属性, history/location/match
 *   4. 路由组件和普通组件
     1. 路由组件不放在app中, 也不通过render渲染到页面, 只在路由中使用
     2. 路由组件<Route to='/path'/>里面的
 */
export default withRouter(LeftNav)

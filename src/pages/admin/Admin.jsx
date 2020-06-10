import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../../pages/home/Home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'

const { Footer, Sider, Content } = Layout

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
			<Layout style={{ height: '100%' }}>
				<Sider>
					<LeftNav />
				</Sider>
				<Layout>
					<Header />
					<Content style={{ backgroundColor: 'white', margin: '20px' }}>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/category" component={Category} />
							<Route path="/product" component={Product} />
							<Route path="/user" component={User} />
							<Route path="/role" component={Role} />
							<Route path="/charts/bar" component={Bar} />
							<Route path="/charts/pie" component={Pie} />
							<Route path="/charts/line" component={Line} />
							<Redirect to="/home" />
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>
						推荐使用谷歌浏览器, 可以获得更加的页面操作体验
					</Footer>
				</Layout>
			</Layout>
		)
	}
}

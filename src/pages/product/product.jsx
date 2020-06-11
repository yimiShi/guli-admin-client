import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './home'
import Detail from './detail'
import AddUpdate from './add-update'
import './product.css'

export default class Product extends Component {
	render() {
		return (
			<Switch>
				<Route path="/product/addUpdate" component={AddUpdate} />
				<Route path="/product/detail" component={Detail} />
				<Route path="/product" component={Home} />
				<Redirect to="/product" />
			</Switch>
		)
	}
}

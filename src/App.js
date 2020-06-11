import React, { Component } from 'react'
import { HashRouter, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'

/*
应用根组件Route
 */
export default class App extends Component {
	render() {
		console.log('app.js')
		return (
			<HashRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" component={Admin} />
					<Redirect to="/login" />
				</Switch>
			</HashRouter>
		)
	}
}

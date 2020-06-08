import React, { Component } from 'react'
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'

/*
应用根组件Route
 */
export default class App extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/admin" component={Admin} />
					<Redirect to="/login" />
				</Switch>
			</HashRouter>
		)
	}
}

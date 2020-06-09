import ajax from './ajax'

const BASE = 'http://localhost:3000'
// login
export function reqLogin(username, password) {
	ajax({
		method: 'post',
		url: BASE + '/login',
		data: {
			username,
			password,
		},
	})
}

// const name = 'tom'
// const pwd = '123'
// reqLogin(name, pwd)

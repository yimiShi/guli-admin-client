import ajax from './ajax'

const BASE = 'http://localhost:3000'

export const reqLogin = (username, password) =>
	/* ajax({
		method: 'post',
		url: BASE + '/login',
		data: {
			username,
			password,
		},
		// data: qs.stringify({ username, password }),
  }) */
	ajax.post(BASE + '/login', { username, password })

// login
// export function reqLogin(username, password) {
// 	return ajax({
// 		method: 'post',
// 		url: BASE + '/login',
// 		data: {
// 			username,
// 			password,
// 		},
// 		// data: qs.stringify({ username, password }),
// 	})
// }

const name = 'tom'
const pwd = '123'
reqLogin(name, pwd).then(
	(response) => {
		console.log('success', response)
	},
	(err) => {
		console.log('error', err)
	}
)

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = 'http://localhost:3000'

/**
 * 登陆
 * @param {} username
 * @param {*} password
 */
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

// const name = 'tom'
// const pwd = '123'
// reqLogin(name, pwd).then(
// 	(response) => {
// 		console.log('success', response)
// 	},
// 	(err) => {
// 		console.log('error', err)
// 	}
// )

/**
 * 发送jsonp请求得到天气信息
 */
export const reqWeather = (city) => {
	return new Promise((resolve, reject) => {
		const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
		jsonp(url, {}, (error, data) => {
			if (!error && data.error === 0) {
				const { weather, dayPictureUrl } = data.results[0].weather_data[0]
				resolve({ dayPictureUrl, weather })
			} else {
				message.error('获取天气失败')
			}
		})
	})
}

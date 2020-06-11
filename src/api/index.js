import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = 'http://localhost:3000'

/**
 * 登陆
 * @param {} username
 * @param {*} password
 */
export const reqLogin = (username, password) => ajax.post(BASE + '/login', { username, password })
/* ajax({
		method: 'post',
		url: BASE + '/login',
		data: {
			username,
			password,
		},
		// data: qs.stringify({ username, password }),
  }) */

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

// 获取分类列表
// export const reqCategorys = () => ajax.get(BASE + '/manage/category/list')
// export const reqCategorys = () => ajax(BASE + '/manage/category/list')
export const reqCategorys = () =>
	ajax({
		method: 'get',
		url: BASE + '/manage/category/list',
	})

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', { categoryName })

// 修改分类
// export const reqUpdateCategory = (categoryId, categoryName) =>
// 	ajax.post(BASE + '/manage/category/update', { categoryId, categoryName })
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
	ajax.post(BASE + '/manage/category/update', { categoryId, categoryName })

/** 根据商品分类id获取分类 */
export const reqCategory = (categoryId) => ajax.get(BASE + '/manage/category/info', { categoryId })

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
	ajax.get(BASE + '/manage/product/list', {
		// 包含所有query参数的对象
		params: {
			pageNum: pageNum,
			pageSize: pageSize,
		},
	})

/**
 * 根据name/desc搜索产品分页列表
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) =>
	ajax(BASE + '/manage/product/search', {
		params: {
			pageNum,
			pageSize,
			[searchType]: searchName,
		},
	})

/** 商品上下架 */
export const reqUpdateStatus = (productId, status) =>
	ajax(BASE + '/manage/product/updateStatus', {
		method: 'POST',
		data: {
			productId,
			status,
		},
	})

// export const reqUpdateStatus = (productId, status) =>
// 	ajax.post(BASE + '/manage/product/updateStatus', {
// 		productId,
// 		status,
// 	})

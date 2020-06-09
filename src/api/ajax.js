import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// 添加请求拦截器, 请求发送之前
// 让post请求的请求体格式为urlencoded格式
axios.interceptors.request.use(function (config) {
	const { method, data } = config

	// data转换成query参数格式字符串
	if (method.toLowerCase() === 'post' && typeof data === 'object') {
		config.data = qs.stringify(data)
	}

	return config
})

// 添加响应拦截器
// 在请求返回之后, 且在我们制定的请求响应回调函数之前
// 1. 成功回调, 返回response.data
// 2.失败回调, 错误统一处理
axios.interceptors.response.use(
	function (response) {
		return response.data
	},
	function (error) {
		// 返回一个pending状态的promise, 中断promise链
		message.error('请求出错 ', error)
		return new Promise(() => {})

		// return Promise.reject(error)
	}
)
export default axios

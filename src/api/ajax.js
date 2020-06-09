import axios from 'axios'
import qs from 'qs'

// 添加请求拦截器, 让post请求的请求体格式为urlencoded格式
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
axios.interceptors.response.use(
	function (response) {
		return response.data
	},
	function (error) {
		return Promise.reject(error)
	}
)
export default axios

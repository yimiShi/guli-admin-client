/**
 * 操作localstorage数据的工具类
 */

export default {
	saveToLocal(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	},

	/**
	 * 返回一个user对象, 没有就返回一个{}
	 */
	getFromLocal(key) {
		return JSON.parse(localStorage.getItem(key) || '{}')
	},

	removeFromLocal(key) {
		localStorage.removeItem(key)
	},
}

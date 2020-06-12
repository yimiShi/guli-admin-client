/**
 * 管理状态数据的函数
 * 作用: 根据老的state和action产生新的state纯函数
 *
 */
import { INCREMENT, DECREMENT } from './action-types'

export default function count(state = 1, action) {
	console.log(state, action)

	switch (action.type) {
		case INCREMENT:
			return state + action.number
		case DECREMENT:
			return state - action.number
		default:
			return state
	}
}

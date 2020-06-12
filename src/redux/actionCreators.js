/**
 * 创建N个用域创建action对象的工厂函数
 */
import { INCREMENT, DECREMENT } from './action-types'
export const increment = (number) => ({ type: INCREMENT, number })

export const decrement = (number) => ({ type: DECREMENT, number })

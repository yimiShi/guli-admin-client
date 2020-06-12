import { createStore } from 'redux'
import reducer from './reducer'

// 指定的函数,
const store = createStore(reducer)
export default store

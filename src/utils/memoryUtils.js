import storageUtils from './storageUtils'

const user = storageUtils.getFromLocal('user_key')
export default {
	user,
	// user: {},
	product: {}, //需要查看的商品对象
}

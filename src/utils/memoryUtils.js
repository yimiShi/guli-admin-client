import storageUtils from './storageUtils'

export default {
	user: storageUtils.getFromLocal('user_key'),
	// user: {},
	product: {}, //需要查看的商品对象
}

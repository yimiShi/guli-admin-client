import storageUtils from './storageUtils'

export default {
	user: storageUtils.getFromLocal('user_key'),
	// user: {},
}

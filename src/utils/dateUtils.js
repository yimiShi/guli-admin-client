export function formateDate(time) {
	if (!time) {
		return ''
	}
	let date = new Date(time)
	let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
	let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
	let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
	let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
	let second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
	return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

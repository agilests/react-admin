
export function formatAlertMessage(e, asSystemError = true) {
    let msg = e.message;
	let formatMsg = msg
    if (!msg) {
        formatMsg = '服务器升级中，请稍后再试'
    }
    else if (msg === 'Network request failed') {
		formatMsg = '网络错误，请查看本地网络是否可用'
	} else if (msg === 'Full authentication is required to access this resource') {
		formatMsg = '请重新登陆'
	} else if (msg['zh-CN']) {
		formatMsg = msg['zh-CN']
	} else {
		formatMsg = msg
	}
	// asSystemError && alertErrorMessage(formatMsg)
	return formatMsg
}

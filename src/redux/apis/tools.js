

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
		return response;
	}
	if(response.status === 401){
        if (response.url.includes(`login`)) {
			response.message = '用户不存在或者密码错误！'
			return response
		} else {
			// store.dispatch(AuthCheck('set',false))
			// store.dispatch({type:'UNAUTHORIZED'});
		}
		const error = new Error('Unauthorized')
		error.message = 'Full authentication is required to access this resource'
		throw error
	}else if(response.status===403){
		window.location.href = '/#/login'
	}
	let errMsg = (response.status == 502) ? '服务器升级中，请稍后再试' : response._bodyText
	if (!errMsg) errMsg = response.statusText
	const error = new Error(errMsg);
	error.response = response;
	throw error;
}
export function formatAlertMessage(e, asSystemError = true) {
    let msg = e.message || e;
	let formatMsg = msg
    if (!msg) {
        formatMsg = '服务器升级中，请稍后再试'
    }else if(msg === 'wrong password'){
		formatMsg = '用户名不存在或密码错误'
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

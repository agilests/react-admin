import signActionKeys from './signActionKeys'

export const fetchSigns = (deviceId) => {
    return {
        type: signActionKeys.fetchSigns,
        deviceId: deviceId
    }
}
export const fetchSignTemplates = () => {
    return {
        type: signActionKeys.fetchSignTemplates
    }
}
export const createSign = (deviceId, sign) => {
    return {
        type: signActionKeys.createSign,
        deviceId: deviceId,
        sign: sign
    }
}
export const currentSign = (sign) => {
    return {
        type: signActionKeys.currentSign,
        sign: sign
    }
}
export const fetchParts = (signId) => {
    return {
        type: signActionKeys.fetchParts,
        signId: signId
    }
}
import resActionKeys from './resActionKeys';

export const fetchVoices = (orgId) => {
    return {
        type: resActionKeys.fetchVoices,
        orgId: orgId
    }
};

export const upload = (formData, key) => {
    return {
        type: resActionKeys.upload,
        formData: formData,
        key: key
    }
};
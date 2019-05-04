import resActionKeys from './resActionKeys';

export const fetchResources = (orgId) => {
    return {
        type: resActionKeys.fetchResources,
        orgId: orgId
    }
};

export const upload = (formData, orgId, key) => {
    return {
        type: resActionKeys.upload,
        formData: formData,
        orgId: orgId,
        key: key
    }
};
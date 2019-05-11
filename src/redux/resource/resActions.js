import resActionKeys from './resActionKeys';

export const fetchVoices = () => {
    return {
        type: resActionKeys.fetchVoices
    }
};

export const upload = (formData, key) => {
    return {
        type: resActionKeys.upload,
        formData: formData,
        key: key
    }
};
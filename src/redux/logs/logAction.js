import logActionKeys from './logActionKeys';

export const fetchLogs = (page, orgId) => {
    return {
        type: logActionKeys.fetchLogs,
        page: page,
        orgId: orgId
    }
};
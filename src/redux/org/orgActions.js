import orgActionKeys from './orgActionKeys';

export const fetchOrgs = () => {
    return {
        type: orgActionKeys.fetchOrgs
    }
};

export const createOrg = (org) => {
    return {
        type: orgActionKeys.createOrg,
        org: org
    }
};

export const updateOrg = (org) => {
    return {
        type: orgActionKeys.updateOrg,
        org: org
    }
};

export const deleteOrg = (orgId) => {
    return {
        type: orgActionKeys.deleteOrg,
        orgId: orgId
    }
};


export const fetchAccounts = (orgId) => {
    return {
        type: orgActionKeys.fetchAccounts,
        orgId: orgId
    }
};

export const createAccount = (orgId, account) => {
    return {
        type: orgActionKeys.createAccount,
        orgId: orgId,
        account: account
    }
};

export const updateAccount = (account) => {
    return {
        type: orgActionKeys.updateAccount,
        account: account
    }
};

export const deleteAccount = (accId) => {
    return {
        type: orgActionKeys.deleteAccount,
        accId: accId
    }
};
export const fetchSetting = (orgId) => {
    return {
        type: orgActionKeys.fetchOrgSetting,
        orgId: orgId
    }
}
export const updateSetting = (orgId, key, value) => {
    return {
        type: orgActionKeys.updateOrgSetting,
        orgId: orgId,
        key: key,
        value: value
    }
}

import NetUtil from './net_utils';
export default class OrgApi{
    static getOrgList(){
        return NetUtil.get('/api/orgs');
    }
    static createOrg(org){
        return NetUtil.post('/api/orgs',org);
    }
    static updateOrg(org){
        return NetUtil.put(`/api/orgs/${org.id}`,org);
    }
    static deleteOrg(orgId){
        return NetUtil.delete(`/api/orgs/${orgId}`);
    }
    static getAccountsByOrg(orgId){
        return NetUtil.get(`/api/orgs/${orgId}/accounts`);
    }
    static createAccount(orgId,account){
        return NetUtil.post(`/api/orgs/${orgId}/accounts`,account);
    }
    static updateAccount(account){
        return NetUtil.put(`/api/accounts/${account.id}`,account);
    }
    static deleteAccount(accId){
        return NetUtil.delete(`/api/accounts/${accId}`);
    }
}
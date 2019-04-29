const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

export default class NetUtil {
    static get(url) {
        return fetch(url, {
            headers: headers,
            credentials: 'include',
            method: 'GET',
            mode: 'cors'
        }).then(res => res.json()).catch(e => { throw e; });
    }
    static post(url, body) {
        return fetch(url, {
            headers: headers,
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(body),
            mode: 'cors'
        }).then(res => res.json()).catch(e => { throw e; });
    }
    static put(url, body) {
        return fetch(url, {
            headers: headers,
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(body),
            mode: 'cors'
        }).then(res => res.json()).catch(e => { throw e; });
    }
    static delete(url) {
        return fetch(url, {
            headers: headers,
            credentials: 'include',
            method: "DELETE",
            mode: 'cors'
        }).then(res => res.json()).catch(e => { throw e; });
    }
}
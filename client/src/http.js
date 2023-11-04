export default {
  get(resource, secure = false) {
    return this.execute('GET', resource, secure);
  },

  post(resource, data, secure = false) {
    return this.execute('POST', resource, secure, data);
  },

  execute(method, resource, secure, data = {}) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      return fetch(resource, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.status);
          } else {
            return response;
          }
        });
    } else {
      return fetch(resource, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      }).then(response => {
        console.log(response)
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response;
        }
      });
    }
  }
}

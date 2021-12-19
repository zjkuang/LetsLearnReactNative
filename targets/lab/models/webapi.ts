enum ORIGIN {
  localhost = 'http://localhost:3000',
  heroku = 'https://jkuang.herokuapp.com',
}
export const origin: ORIGIN = ORIGIN.localhost;

interface Account {
  info: string; // GET, PUT
  checkStatus: string; // GET
  create: string; // POST
  activate: string; // PUT
  delete: string; // DELETE
}

interface Session {
  login: string; // POST, PUT
  logout: string; // PUT
}

interface PNS {
  register: string; // POST
  deregister: string; // DELETE
  enable: string; // PUT
  disable: string; // PUT
}

interface EndPoints {
  account: Account;
  session: Session;
  pns: PNS;
}

export const endpoints: EndPoints = {
  account: {
    info: '/rest/account/info',
    checkStatus: '/rest/account/check-status', // can be used to check the availability before registerting an account by email
    create: '/rest/account/create',
    activate: '/rest/account/activate',
    delete: '/rest/account/delete',
  },

  session: {
    login: '/rest/login',
    logout: '/rest/logout',
  },

  pns: {
    register: '/rest/pns/register',
    deregister: '/rest/pns/deregister',
    enable: '/rest/pns/enable',
    disable: '/rest/pns/disable',
  },
};

type ResponseStatus = 'success' | 'failure';
function _checkResponseStatus(status: number): ResponseStatus {
  if (status >= 200 && status < 300) {
    return 'success';
  }
  return 'failure';
}

function _get(url: string, extraHeaders?: object): Promise<object> {
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      ...extraHeaders,
    };
    fetch(url, {headers, method: 'GET'})
      .then(result => {
        const status = _checkResponseStatus(result.status);
        result
          .json()
          .then(value => {
            if (status === 'success') {
              resolve(value);
            } else {
              reject(value);
            }
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        console.log(`*** _get() reject reason: ${JSON.stringify(reason)}`);
        reject({message: 'reject(reason) to be implemented.'});
      });
  });
}

function _post(
  url: string,
  body?: object,
  extraHeaders?: object,
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      ...extraHeaders,
    };
    fetch(url, {headers, method: 'POST', body: JSON.stringify(body)})
      .then(result => {
        const status = _checkResponseStatus(result.status);
        result
          .json()
          .then(value => {
            if (status === 'success') {
              resolve(value);
            } else {
              reject(value);
            }
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        console.log(`*** _post() reject reason: ${JSON.stringify(reason)}`);
        reject({reason});
      });
  });
}

function _put(
  url: string,
  body?: object,
  extraHeaders?: object,
): Promise<object> {
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      ...extraHeaders,
    };
    fetch(url, {headers, method: 'PUT', body: JSON.stringify(body)})
      .then(result => {
        const status = _checkResponseStatus(result.status);
        result
          .json()
          .then(value => {
            if (status === 'success') {
              resolve(value);
            } else {
              reject(value);
            }
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        console.log(`*** _put() reject reason: ${JSON.stringify(reason)}`);
        reject({message: 'reject(reason) to be implemented.'});
      });
  });
}

function _delete(url: string, extraHeaders?: object): Promise<object> {
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      ...extraHeaders,
    };
    fetch(url, {headers, method: 'DELETE'})
      .then(result => {
        const status = _checkResponseStatus(result.status);
        result
          .json()
          .then(value => {
            if (status === 'success') {
              resolve(value);
            } else {
              reject(value);
            }
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        console.log(`*** _delete() reject reason: ${JSON.stringify(reason)}`);
        reject({message: 'reject(reason) to be implemented.'});
      });
  });
}

interface WebAPI {
  get: (url: string, headers?: object) => Promise<object>;
  post: (
    url: string,
    body?: object,
    headers?: object,
  ) => Promise<Record<string, any>>;
  put: (url: string, body?: object, headers?: object) => Promise<object>;
  delete: (url: string, headers?: object) => Promise<object>;
}
export const webAPI: WebAPI = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

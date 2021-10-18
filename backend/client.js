import fetch from "isomorphic-unfetch";

function client(endpoint, {bode, ...customConfig}) {
  const headers = {'content-type': 'application/json'}
  const config = {
    method: vody ? 'POST' : 'GET',

    ...customConfig,
    headers: {
      ...headers,

      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`http://localhost:3001/${endppoint}`, config).then(async (r) => {
    if(r.status == 401) {
      return
    }
    const data = await r.json();
    if (r.ok) {
      return data;
    } else {

      return Promise.reject(data);
    }
  })
}


export {client};

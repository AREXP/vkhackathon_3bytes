const appid = '6228218'
const server = 'https://528022fe.ngrok.io'

export function vkapi({ method, payload = {} }) {
  return new Promise((res, rej) => {
    VK.api(method, payload, data => {
      res(data)
    })
  })
}

async function request(href, options) {
  const result = await fetch(`${server}/${href}`, options)

  return result
}

export function get(href, options) {
  return request(href, {
    method: 'GET',
    ...options,
  }).then(response =>
    response.json().then(json => ({ json, response })),
  ).then(
    ({ json }) => json,
    error => ({
      error: error.message || 'Something bad happened',
    }),
  )
}

export function remove(href, options) {
  return request(href, {
    method: 'DELETE',
    ...options,
  }).then(response =>
    response.json().then(json => ({ json, response })),
  ).then(
    ({ json }) => json,
    error => ({
      error: error.message || 'Something bad happened',
    }),
  )
}

export function post(href, options) {
  return request(href, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(options),
  }).then(response =>
    response.json().then(json => ({ json, response })),
  ).then(
    ({ json }) => json,
    error => ({
      error: error.message || 'Something bad happened',
    }),
  )
}

export function login() {
  const redirectUri = 'http://172.19.245.8:3000/'
  window.location = `https://oauth.vk.com/authorize?client_id=${appid}&display=page&redirect_uri=${redirectUri}&scope=friends&response_type=token`
}

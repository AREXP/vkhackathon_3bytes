const token = '372ba5f08a0235ded265a9879f9e43b343d43546017cd444c1993646a0f7226ae3eca2d43cfc93039c846'

// const server = 'http://localhost:3030'
const server = 'http://172.19.245.10:8081'
const vkServer = 'https://api.vk.com/method'

// const qwer = 'method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V'

async function vkRequies(href, options) {
  const result = await fetch(`${vkServer}/${href}&access_token=${token}&v=5.68`, options)

  return result
}

export function vkGet(href, options) {
  return vkRequies(href, {
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

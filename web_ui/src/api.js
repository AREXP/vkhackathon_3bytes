const server = 'http://localhost:3030'
// const server = 'http://172.19.245.10:8080'

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

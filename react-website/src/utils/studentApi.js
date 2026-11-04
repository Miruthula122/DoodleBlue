const API_URL = 'http://localhost:3000/students'

export async function studentApi(path = '', options) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, options)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Cannot connect to JSON Server at http://localhost:3000. Start it in a separate terminal with "npm run server".',
        { cause: error },
      )
    }

    throw error
  }

  if (!response.ok) {
    const details = await response.text()
    throw new Error(
      `Request failed (${response.status} ${response.statusText})${details ? `: ${details}` : ''}`,
    )
  }

  return response.json()
}

export function jsonRequest(method, body) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}


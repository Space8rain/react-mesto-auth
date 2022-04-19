// export const BASE_URL = 'https://auth.nomoreparties.co/'
// export const BASE_URL = 'https://api.itbro.su/'
export const BASE_URL = 'http://localhost:3000/'

// Универсальный запрос
const request = ({ url, body, method='POST' }) => {
  const config = {
    credentials: 'include',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!!body && { body: JSON.stringify(body) })
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

// Запрос на регистрацию
export const register = (email, password) => {
  return request({
    url: 'signup',
    body: { email, password },
  });
};

// Запрос на авторизацию
export const authorize = (email, password) => {
  return request({
    url: 'signin',
    body: { email, password },
  })
}

export const getContent = () => {
  return request({
    url: 'users/me',
    method: 'GET'
  })
}

// Проверка токена
export const checkToken = (token) => {
  return request({
    url: 'users/me',
    method: 'GET',
    token,
  })
}

export const logOut = () => {
  return request({
    url: 'logout',
    method: 'DELETE',
  })
}
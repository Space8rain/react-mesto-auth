export const BASE_URL = 'https://auth.nomoreparties.co/'

// Универсальный запрос
const request = ({ url, token, body, method='POST' }) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
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
  .then((res) => {
    if (res.token) {
      localStorage.setItem('jwt', res.token)
      return res;
    }
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
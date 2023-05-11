export const BASE_URL = "https://auth.nomoreparties.co";

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export function authorize(email, password) {
  return makeRequest("/signin", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
}

export function register(email, password) {
  return makeRequest("/signup", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
}

export function getUserData(token) {
  return makeRequest("/users/me", "GET", null, token);
}

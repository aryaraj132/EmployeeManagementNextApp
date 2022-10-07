import { getUserToken } from './utilities';
import { AccessDenied, BadRequest } from './FetchError';

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getUserToken();
  if (token != undefined) {
    const authHeader = 'Token ' + token;
    headers.Authorization = authHeader;
  }

  console.log(headers);
  return headers;
}

function get(url, params) {
  let urlWithParam = `${url}`;
  if (params && Object.keys(params).length > 0) {
    urlWithParam += '?';
    urlWithParam += new URLSearchParams(params);
  }

  const headers = getHeaders();
  return fetch(urlWithParam, {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  }).then(handleResponse);
}

function post(url, body) {
  const headers = getHeaders();
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function put(url, body) {
  const headers = getHeaders();
  return fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function _delete(url, body) {
  const headers = getHeaders();
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function deleteAuth(url, body) {
  const headers = getHeaders();
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function patch(url, body) {
  const headers = getHeaders();
  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(body),
  }).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401].includes(response.status)) {
        UserService._deleteUserNReload();
      }

      if (response.status === 400) {
        return Promise.reject(new BadRequest(data));
      }

      if (response.status === 403) {
        return Promise.reject(new AccessDenied(data));
      }

      return Promise.reject();
    }

    return data;
  });
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  deleteAuth,
  patch,
};

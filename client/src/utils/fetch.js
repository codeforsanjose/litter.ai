/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import URLpath from './URLpath';

async function getAuthToken() {
  try {
    const res = await fetch(URLpath('refresh-token'), {
      method: 'GET',
      credentials: 'include',
    });
    const response = await res.json();
    Cookies.set('authToken', response.token, { expires: 7 });
  } catch (err) {
    console.error(err);
  }
}

export default async function fetchData(path, method, body) {
  const token = Cookies.get('authToken');
  const properties = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Leaderboard queries for the user's stats if they are logged in
  if (token) { properties.headers.Authorization = `Bearer ${token}`; }
  // Body is the email and password for logging in
  if (body) { properties.body = JSON.stringify(body); }

  try {
    const res = await fetch(URLpath(path), properties);
    const response = await res.json();
    if (response.errorCode && response.errorCode === 'EXPIRED_TOKEN') {
      try {
        await getAuthToken();
      } catch (err) {
        console.log(err);
      }
    }
    return response;
  } catch (err) {
    return err;
  }
}

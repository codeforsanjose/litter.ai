/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import URLpath from './URLpath';

export async function fetchUserData(path, body) {
  try {
    const res = await fetch(URLpath(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    Cookies.set('authToken', response.token, { expires: 7 });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLeaderboardData(path) {
  try {
    const token = Cookies.get('authToken');
    const res = await fetch(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

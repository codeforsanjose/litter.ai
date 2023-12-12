/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import loginAuth from './cookies';
import URLpath from './URLpath';

export async function fetchLogin(body) {
  try {
    const res = await fetch(URLpath('login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    loginAuth(response.token);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLogOut() {
  try {
    const token = loginAuth();
    await fetch(URLpath('logout'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    Cookies.remove('authToken');
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLeaderboardData(path) {
  try {
    const token = loginAuth();
    const res = await fetch(path, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

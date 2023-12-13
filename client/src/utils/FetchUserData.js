/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import loginAuth from './loginAuth';
import URLpath from './URLpath';

export async function fetchLogin(body) {
  try {
    const res = await fetch(URLpath('login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    Cookies.set('authToken', response.token, { expires: 7 });
    Cookies.set('username', response.user.username, { expires: 7 });
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
    await Cookies.remove('authToken');
    await Cookies.remove('username');
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLeaderboardData(path, token) {
  let headers = {};
  if (token) {
    headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  try {
    const res = await fetch(path, headers);
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchProfileData(user, token) {
  try {
    const res = await fetch(URLpath('photo', user), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

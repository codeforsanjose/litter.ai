/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import URLpath from './URLpath';

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
    return response;
  } catch (err) {
    console.error(err);
  }
}

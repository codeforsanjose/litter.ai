/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import URLpath from './URLpath';

export default async function fetchData(path, method, body) {
  const token = Cookies.get('authToken');
  let properties = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // If user is not logged in, leaderboard won't query for the user's stats
  if (token) {
    properties = {
      ...properties,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  // Body is the email and password for logging in
  if (body) { properties = { ...properties, body: JSON.stringify(body) }; }

  try {
    const res = await fetch(URLpath(path), properties);
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

/* eslint-disable consistent-return */
import URLpath from './URLpath';

export default async function fetchUserData(body, path) {
  try {
    const res = await fetch(URLpath(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

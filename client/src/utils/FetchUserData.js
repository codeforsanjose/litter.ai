/* eslint-disable consistent-return */
import URLpath from './URLpath';

export async function fetchUserData(body, path) {
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

export async function fetchLeaderboardData(path) {
  try {
    const res = await fetch(path);
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

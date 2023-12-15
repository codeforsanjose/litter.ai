import URLpath from './URLpath';

export default async function fetch(path, method, token, body) {
  let headers = {
    method,
    headers: { Authorization: `Bearer ${token}` },
  };
  if (body) {
    headers = { ...headers, body };
  }

  try {
    await fetch(URLpath(path), headers);
  } catch (err) {
    console.error(err);
  }
}

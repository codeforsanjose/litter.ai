/* eslint-disable consistent-return */
export default async function fetchUserData(body, path) {
  const link = `http://localhost:3001/${path}`;

  try {
    const res = await fetch(link, {
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

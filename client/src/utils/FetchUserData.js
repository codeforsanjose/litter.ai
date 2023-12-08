export default async function LoginUser(body, path) {
  const link = `http://localhost:3001/${path}`;

  try {
    const res = await fetch(link, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

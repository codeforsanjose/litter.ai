export default function URLpath(endpoint, extension) {
  const link = 'http://localhost:3001';
  return extension
    ? `${link}/${endpoint}/${extension}`
    : `${link}/${endpoint}`;
}

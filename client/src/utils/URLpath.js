export default function URLpath(endpoint, extension) {
  const deployed = 'http://52.26.157.53/litterai';
  // const local = 'http://localhost:3001';
  return extension
    ? `${deployed}/${endpoint}/${extension}`
    : `${deployed}/${endpoint}`;
}

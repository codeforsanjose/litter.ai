export default function URLpath(endpoint, extension) {
  const deployed = 'http://52.26.157.53/litterai';
  // const local = 'http://localhost:3001';
  const link = deployed;
  return extension
    ? `${link}/${endpoint}/${extension}`
    : `${link}/${endpoint}`;
}

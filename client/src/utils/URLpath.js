export const aiEndpoint = process.env.REACT_APP_AI_KEY;

export default function URLpath(endpoint, extension) {
  const deployed = process.env.REACT_APP_API_KEY;
  // const local = 'http://localhost:3001';
  const link = deployed;
  return extension
    ? `${link}/${endpoint}/${extension}`
    : `${link}/${endpoint}`;
}

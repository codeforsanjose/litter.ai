export const aiEndpoint = process.env.REACT_APP_AI_KEY || 'https://aii.littersort.ai';

export default function URLpath(endpoint, extension) {
  const deployed = process.env.REACT_APP_API_KEY || 'https://api.littersort.ai';
  // const local = 'http://localhost:3001';
  const link = deployed;
  return extension
    ? `${link}/${endpoint}/${extension}`
    : `${link}/${endpoint}`;
}

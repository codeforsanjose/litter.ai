export default function URLpath(endpoint, extension) {
  return extension
    ? `http://localhost:3001/${endpoint}/${extension}`
    : `http://localhost:3001/${endpoint}`;
}

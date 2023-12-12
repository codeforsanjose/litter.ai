export default function URLpath(endpoint, extension) {
  return extension
    ? `http://52.26.157.53/litterai/${endpoint}/${extension}`
    : `http://52.26.157.53/litterai/${endpoint}`;
}

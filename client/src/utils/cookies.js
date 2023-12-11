import Cookies from 'js-cookie';

export default function loginAuth(loginToken) {
  const token = Cookies.get('authToken');
  if (token) return token;
  Cookies.set('authToken', loginToken, { expires: 7 });
  return token;
}

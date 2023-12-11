import Cookies from 'js-cookie';

export function setCookies(loginToken) {
  Cookies.set('authToken', loginToken, { expires: 7 });
}

export function getCookies() {
  Cookies.get('authToken');
}

// export default function loginAuth(loginToken) {
//   if (setCookies(loginToken)) {

//   }
// }

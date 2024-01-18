/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import fetchData from './fetch';

export async function fetchLogin(body) {
  try {
    const response = await fetchData('login', 'POST', body);
    if (response.token) {
      Cookies.set('authToken', response.token, { expires: 7 });
      Cookies.set('username', response.user.displayUsername, { expires: 7 });
    }
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLogOut() {
  try {
    await fetchData('logout', 'POST');
    await Cookies.remove('authToken');
    await Cookies.remove('username');
  } catch (err) {
    console.error(err);
  }
}

export async function fetchLeaderboardData(path) {
  try {
    const response = await fetchData(path, 'GET');
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchProfileData(user) {
  try {
    const response = await fetchData(`photo/${user}`, 'GET');
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchRegister(body) {
  try {
    const response = await fetchData('register', 'POST', body);
    if (response.status === 'pending') {
      const loginBody = {
        email: body.email,
        password: body.password,
      };
      const loginResponse = await fetchLogin(loginBody);
      return loginResponse;
    }
    return response;
  } catch (err) {
    console.error(err);
  }
}

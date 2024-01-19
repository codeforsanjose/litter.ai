/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import fetchData from './fetch';
import URLpath from './URLpath';

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
    const res = await fetch(URLpath('logout'), {
      method: 'POST',
      credentials: 'include',
    });
    Cookies.remove('authToken');
    Cookies.remove('username');
    const response = await res.json();
    return response;
  } catch (err) {
    console.log(err);
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

    // * Note: The following code block is only for MVP.
    // Current solution: If registration is successful, automatically log user in.
    // Future solution: User will not be automatically logged in, but will be emailed a verification
    // link, and response.status will need to be 'verified' before user is properly authenicated.
    // For now, 'response.status === pending' is our check for successful registration,
    // and user will be automatically logged in.
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

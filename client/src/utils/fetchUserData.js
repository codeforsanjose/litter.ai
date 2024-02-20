/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import fetchData from './fetch';
import { aiEndpoint } from './URLpath';

export async function fetchLogin(body) {
  try {
    const response = await fetchData('login', 'POST', body, 'include');
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
    const res = await fetchData('logout', 'POST', null, 'include');
    Cookies.remove('authToken');
    Cookies.remove('username');
    const response = await res.json();
    return response;
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
    fetchLogOut();
    return err;
  }
}

export async function fetchProfileData(user) {
  try {
    const response = await fetchData(`photo/${user}`, 'GET');
    return response;
  } catch (err) {
    console.error(err);
    fetchLogOut();
  }
}

export async function fetchImageToAI(image) {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(`${aiEndpoint}/upload`, {
      method: 'POST',
      body: formData,
    });
    const response = await res.json();
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

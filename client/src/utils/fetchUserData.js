/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import fetchData from './fetch';

export async function fetchLogin(body) {
  try {
    const response = await fetchData('login', 'POST', body);
    Cookies.set('authToken', response.token, { expires: 7 });
    Cookies.set('username', response.user.displayUsername, { expires: 7 });
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
    fetchLogOut();
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
    const res = await fetch('https://64ee-2601-646-c600-3560-d419-a27c-984f-1c5.ngrok-free.app/upload', {
      method: 'POST',
      body: formData,
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

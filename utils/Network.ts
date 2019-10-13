import axios from 'axios';

export async function get(endpoint: string, token?: string, params?: object) {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}${endpoint}`, {
      headers: { Authorization: `bearer ${token}` },
      params: {
        ...params,
      },
    });
    return response && response.data;
  } catch (e) {
    return e.error;
  }
}

export async function post(endpoint: string, token?: string, params?: object) {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}${endpoint}`, params, {
      headers: { Authorization: `bearer ${token}` },
    });
    return response && response.data;
  } catch (e) {
    return e.error;
  }
}

export async function put(endpoint: string, token?: string, params?: object) {
  try {
    const response = await axios.put(`${process.env.SERVER_URL}${endpoint}`, params, {
      headers: { Authorization: `bearer ${token}` },
    });
    return response && response.data;
  } catch (e) {
    return e && e.error;
  }
}

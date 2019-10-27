import axios from 'axios';
import qs from 'qs';

type Props = {
  endpoint: string;
  token?: string;
  params?: object;
};

export enum MESSAGES_STATUS {
  OK = 'OK',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  NONE = 'NONE',
}

export async function get({ endpoint, token, params }: Props) {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}${endpoint}`, {
      headers: { Authorization: `bearer ${token}` },
      params: qs.stringify({ ...params }),
    });
    return response && response.data;
  } catch (e) {
    throw e;
  }
}

export async function post({ endpoint, params }: Props) {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}${endpoint}`, qs.stringify({ ...params }), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
}

export async function put({ endpoint, token, params }: Props) {
  try {
    const response = await axios.put(`${process.env.SERVER_URL}${endpoint}`, qs.stringify({ ...params }), {
      headers: { Authorization: `bearer ${token}` },
    });
    return response && response.data;
  } catch (e) {
    throw e;
  }
}

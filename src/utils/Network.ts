import axios from 'axios';
import qs from 'qs';
import cookie from 'js-cookie';

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

export async function get({ endpoint, params }: Props) {
  const token = await cookie.get('token');
  const response = await axios.get(`${process.env.SERVER_URL}${endpoint}`, {
    headers: { Authorization: `bearer ${token}`, 'Content-type': 'application/x-www-form-urlencoded' },
    params: qs.stringify({ ...params }),
  });
  return response && response.data;
}

export async function post({ endpoint, params }: Props) {
  const token = await cookie.get('token');
  const response = await axios.post(`${process.env.SERVER_URL}${endpoint}`, qs.stringify({ ...params }), {
    headers: {
      Authorization: `bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
}

export async function put({ endpoint, token, params }: Props) {
  const response = await axios.put(`${process.env.SERVER_URL}${endpoint}`, qs.stringify({ ...params }), {
    headers: { Authorization: `bearer ${token}`, 'Content-type': 'application/x-www-form-urlencoded' },
  });
  return response && response.data;
}

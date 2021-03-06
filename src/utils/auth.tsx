import cookie from 'js-cookie';

export const login = ({ token }: any) => {
  cookie.set('token', token, { expires: 1 });
};

export const logout = () => {
  cookie.remove('token');
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('logout', String(Date.now()));
};

import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token }: any) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/profile');
};

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx);

  // If true, so we are on the server.
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login');
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('logout', String(Date.now()));
  Router.push('/login');
};

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    useEffect(() => {
      // eslint-disable-next-line no-undef
      window.addEventListener('storage', syncLogout);

      return () => {
        // eslint-disable-next-line no-undef
        window.removeEventListener('storage', syncLogout);
        // eslint-disable-next-line no-undef
        window.localStorage.removeItem('logout');
      };
    }, [null]);

    // eslint-disable-next-line react/react-in-jsx-scope,react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};

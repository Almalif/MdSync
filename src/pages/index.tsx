import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import { withAuthSync } from '../utils/auth';
import Home from '../components/Home';
import Layout from '../Layouts/Layout';

const HomePage = (): React.ReactNode => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx && ctx.res && ctx.res.writeHead(302, { Location: '/login' }).end();
  if (!token) {
    redirectOnError();
  }
};

export default withAuthSync(HomePage);

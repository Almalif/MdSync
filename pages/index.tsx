import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import Layout from '../Layouts/Layout';
import { withAuthSync } from '../utils/auth';
import { get } from '../utils/Network';

const HomePage = (): React.ReactNode => {
  return (
    <Layout>
      <div>{process.env.SERVER_URL}</div>
    </Layout>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx && ctx.res && ctx.res.writeHead(302, { Location: '/login' }).end();
  try {
    const response = await get('/usersinfos', token);
    if (response.ok) {
      return response.data;
    }
    return await redirectOnError();
  } catch (error) {
    return redirectOnError();
  }
};

export default withAuthSync(HomePage);

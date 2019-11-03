import React from 'react';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import redirect from '../utils/redirect';
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
  if (!token) {
    await redirect('/login');
  }
  return {};
};

export default HomePage;

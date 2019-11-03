import React from 'react';
import cookie from 'js-cookie';
import Home from '../components/Home';
import Layout from '../Layouts/Layout';
import redirect from '../utils/redirect';

const HomePage = (): React.ReactNode => {
  const token = cookie.get('token');
  if (!token) {
    redirect('/login');
  }
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;

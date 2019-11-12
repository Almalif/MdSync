import React from 'react';
import cookie from 'js-cookie';
import { withTranslation } from 'react-i18next';
import Home from '../components/Home';
import Layout from '../Layouts/Layout';

const HomePage = (params: any) => {
  const { t, history } = params;
  const token = cookie.get('token');
  if (!token) {
    history.push('/login');
  }
  return (
    <Layout title={t('title')}>
      <Home />
    </Layout>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(HomePage);

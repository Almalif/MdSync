import React from 'react';
import cookie from 'js-cookie';
import Home from '../components/Home';
import Layout from '../Layouts/Layout';
import redirect from '../utils/redirect';
import { withTranslation, PropsI18n } from '../utils/i18n';

const HomePage = ({ t }: PropsI18n) => {
  const token = cookie.get('token');
  if (!token) {
    redirect('/login');
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

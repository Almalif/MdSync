import React from 'react';

import { withAuthSync } from '../../utils/auth';

import Layout from '../../Layouts/Layout';

import Document from './document';

const FilePage = () => {
  return (
    <Layout>
      <div style={{ height: '90vh' }}>
        <Document />
      </div>
    </Layout>
  );
};

export default withAuthSync(FilePage);

import React, { useState } from 'react';
import cookie from 'js-cookie';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { withTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';
import Document from './document';
import { get } from '../../utils/Network';

const getFileName = async (id: string | string[], setIdFile: any) => {
  try {
    const response = await get({ endpoint: `/files/${id}` });
    const idFile = response && response.id;
    if (typeof idFile === 'string') setIdFile(idFile);
  } catch (e) {
    toast(
      {
        type: 'warning',
        icon: 'info',
        title: 'Warning Toast',
        description: e && e.response && e.response.data,
        animation: 'bounce',
        time: 5000,
        size: 'tiny',
      },
      () => {},
      () => {},
      () => {},
    );
    return null;
  }
  return null;
};

const FilePage = (params: any) => {
  const { t, history, match } = params;
  const token = cookie.get('token');
  if (!token) {
    history.push('/login');
  }
  const [idFile, setIdFile] = useState<string | null>(null);
  const fileId = match && match.params && match.params.id;
  if (fileId) getFileName(fileId, setIdFile);

  return (
    <Layout title={t('title')}>
      <SemanticToastContainer />
      <div style={{ height: '90vh' }}>
        <Document idFile={idFile} />
      </div>
    </Layout>
  );
};

export default withTranslation('file')(FilePage);

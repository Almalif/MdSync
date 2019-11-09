import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import Layout from '../../Layouts/Layout';
import Document from './document';
import redirect from '../../utils/redirect';
import { get } from '../../utils/Network';
import { withTranslation, PropsI18n } from '../../utils/i18n';

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

const FilePage = ({ t }: PropsI18n) => {
  const token = cookie.get('token');
  if (!token) {
    redirect('/login');
  }
  const [idFile, setIdFile] = useState<string | null>(null);
  const router = useRouter();
  const fileId = router && router.query && router.query.id;
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

FilePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'file'],
});

export default withTranslation('file')(FilePage);

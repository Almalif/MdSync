import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import Layout from '../../Layouts/Layout';
import Document from './document';
import redirect from '../../utils/redirect';
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

const FilePage = () => {
  const token = cookie.get('token');
  if (!token) {
    redirect('/login');
  }
  const [idFile, setIdFile] = useState<string | null>(null);
  const router = useRouter();
  const fileId = router && router.query && router.query.id;
  if (fileId) getFileName(fileId, setIdFile);

  return (
    <Layout>
      <SemanticToastContainer />
      <div style={{ height: '90vh' }}>
        <Document idFile={idFile} />
      </div>
    </Layout>
  );
};

export default FilePage;

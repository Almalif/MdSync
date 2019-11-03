import React, { useState } from 'react';
import { useRouter } from 'next/router'

import Layout from '../../Layouts/Layout';

import Document from './document';

import { get } from '../../utils/Network';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

const getFileName = async (id: string | string[], setIdFile: any) => {
  try {
    const response = await get({endpoint: `/files/${id}`})
    const idFile = response && response.id;
    if (typeof idFile === 'string')
      setIdFile(idFile)
  }
  catch (e) {
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
}

const FilePage = () => {
  const [idFile, setIdFile] = useState<string|null>(null)
  const router = useRouter();
  const fileId = router && router.query && router.query.id;
  if (fileId)
    getFileName(fileId, setIdFile);

  return (
    <Layout>
      <SemanticToastContainer />
      <div style={{ height: '90vh' }}>
        <Document idFile={idFile}/>
      </div>
    </Layout>
  );
};

export default FilePage;

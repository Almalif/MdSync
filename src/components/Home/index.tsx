import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import Router from 'next/router';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import * as Network from '../../utils/Network';
import { withTranslation } from '../../utils/i18n';

const createFile = async (filename: string) => {
  try {
    const response = await Network.post({
      endpoint: '/files',
      params: {
        name: filename,
      },
    });
    if (response && response.data && response.data.id) {
      await Router.push({
        pathname: `/file/${response.data.id}`,
      });
    }
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
  }
};

const Home = ({ t }: any) => {
  const [filename, setFilename] = useState<string>('');
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column>
        <Input
          placeholder={t('filename')}
          onChange={(_, { value }) => {
            setFilename(value);
          }}
        />
        <Button size="large" onClick={() => createFile(filename)}>
          {t('creatFile')}
        </Button>
      </Grid.Column>
      <SemanticToastContainer />
    </Grid>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'register'],
});

export default withTranslation('home')(Home as any);

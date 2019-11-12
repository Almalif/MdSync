import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import * as Network from '../../utils/Network';

const createFile = async (filename: string, history: any) => {
  try {
    const response = await Network.post({
      endpoint: '/files',
      params: {
        name: filename,
      },
    });
    if (response && response.data && response.data.id) {
      await history.push({
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
  const history = useHistory();
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
        <Button size="large" onClick={() => createFile(filename, history)}>
          {t('creatFile')}
        </Button>
      </Grid.Column>
      <SemanticToastContainer />
    </Grid>
  );
};

export default withTranslation('home')(Home);

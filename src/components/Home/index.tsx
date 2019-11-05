import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import Router from 'next/router';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import * as Network from '../../utils/Network';

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

const Home = () => {
  const [filename, setFilename] = useState<string>('');
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column>
        <Input
          placeholder="File name.."
          onChange={(_, { value }) => {
            setFilename(value);
          }}
        />
        <Button size="large" onClick={() => createFile(filename)}>
          Create file
        </Button>
      </Grid.Column>
      <SemanticToastContainer />
    </Grid>
  );
};

export default Home;

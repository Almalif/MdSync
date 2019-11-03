import React from 'react';
import { Button } from 'semantic-ui-react';
import Router from 'next/router';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import * as Network from '../../utils/Network';

const Home = () => {
  const createFile = async () => {
    try {
      const response = await Network.post({
        endpoint: '/files',
        params: {
          name: 'putos3',
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
  return (
    <div>
      <Button size="massive" onClick={createFile}>
        Create file
      </Button>
      <SemanticToastContainer />
    </div>
  );
};

export default Home;

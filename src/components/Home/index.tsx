import React from 'react';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import { Button } from 'semantic-ui-react';
import { Router } from 'next/router';

import * as Network from '../../utils/Network';

const Home = (props: any) => {
  const createFile = props => {
    Network.post('/files', {});
  };
  return (
    <div>
      <Button size="massive" onClick={createFile}>
        Create file
      </Button>
    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx && ctx.res && ctx.res.writeHead(302, { Location: '/login' }).end();
  if (!token) {
    redirectOnError();
  }
  return { token };
};

export default Home;

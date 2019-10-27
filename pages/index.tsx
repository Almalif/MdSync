import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import Layout from '../Layouts/Layout';
import { withAuthSync } from '../utils/auth';
import { get } from '../utils/Network';
// import 'semantic-ui-css/semantic.min.css';
// import { Button, Icon } from 'semantic-ui-react';
//
// import './styles.css';

// export default () => (
//   <div className="centered">
//     <Button animated>
//       <Button.Content visible>Next</Button.Content>
//       <Button.Content hidden>
//         <Icon name="arrow right" />
//       </Button.Content>
//     </Button>
//     <Button animated="vertical">
//       <Button.Content hidden>Shop</Button.Content>
//       <Button.Content visible>
//         <Icon name="shop" />
//       </Button.Content>
//     </Button>
//     <Button animated="fade">
//       <Button.Content visible>Sign-up for a Pro account</Button.Content>
//       <Button.Content hidden>$12.99 a month</Button.Content>
//     </Button>
//   </div>
// );

const HomePage = (): React.ReactNode => {
  return (
    <Layout>
      <div>{process.env.SERVER_URL}</div>
    </Layout>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx && ctx.res && ctx.res.writeHead(302, { Location: '/login' }).end();
  try {
    const response = await get({endpoint:'/usersinfos', token});
    if (response.ok) {
      return response.data;
    }
    return await redirectOnError();
  } catch (error) {
    return redirectOnError();
  }
};

export default withAuthSync(HomePage);

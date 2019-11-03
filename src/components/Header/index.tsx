import React from 'react';
import Head from 'next/head';
import { Image } from 'semantic-ui-react';

import NavLinks from './nav';

import 'semantic-ui-css/semantic.min.css';

const Header = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="ui secondary  menu">
        <div>
          <Image src="static/assets/capsule.svg" width="30px" />
        </div>
        <div>{NavLinks()}</div>
      </div>
    </div>
  );
};

export default Header;

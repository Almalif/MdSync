import React from 'react';
import Head from 'next/head';
import { Image } from 'semantic-ui-react';

import NavLinks from './nav';

import 'semantic-ui-css/semantic.min.css';

type Props = {
  title?: string;
};
const Header = ({ title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title || 'Page'}</title>
      </Head>
      <div className="ui secondary  menu">
        <div>
          <Image src="/static/mdma.png" width="30px" />
        </div>
        <div>{NavLinks()}</div>
      </div>
    </div>
  );
};

export default Header;

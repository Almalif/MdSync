import React from 'react';
import Head from 'next/head';
import Nav from '../nav';

const Header = () => {
  return (
    <Head>
      <Nav />
      <title>Home</title>
    </Head>
  );
};

export default Header;

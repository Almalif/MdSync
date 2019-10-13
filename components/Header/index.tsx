import React from 'react';
import Head from 'next/head';
import { Image, Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import NavLinks from './nav';

const NavStyled = styled(Navbar)`
  background-color: #f27121 !important;
  a {
    color: #8a2387 !important;
  }
  height-min: 50px;
  border: 1px solid #f27121;
  border-radius: 5px;
`;

const Header = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <NavStyled bg="dark" expand>
        <Navbar.Brand href="/">
          <Image src="static/assets/capsule.svg" width="30px" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{NavLinks()}</Nav>
        </Navbar.Collapse>
      </NavStyled>
    </div>
  );
};

export default Header;

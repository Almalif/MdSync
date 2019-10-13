import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

type PropsType = {
  children: React.ReactNode;
};

export default ({ children }: PropsType) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

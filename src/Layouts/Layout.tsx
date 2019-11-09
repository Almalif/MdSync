import React from 'react';
import '../pages/styles.css';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/Header';

type PropsType = {
  title?: string;
  children: React.ReactNode;
};

export default ({ children, title }: PropsType) => {
  return (
    <div>
      <Header title={title} />
      <div>{children}</div>
    </div>
  );
};

import React from 'react';
// import { Button, Icon } from 'semantic-ui-react';
import '../pages/styles.css';
import 'semantic-ui-css/semantic.min.css';

type PropsType = {
  children: React.ReactNode;
};

export default ({ children }: PropsType) => {
  return (
    <div>
      {children}
    </div>
  );
};

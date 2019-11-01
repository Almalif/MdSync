import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Header, Image, Message } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { post, MESSAGES_STATUS } from '../utils/Network';
import redirect from '../utils/redirect';
import { login } from '../utils/auth';

type SubmitProps = {
  mail: string;
  password: string;
  setError: Function;
};

const handleSubmit = async ({ mail, password, setError }: SubmitProps) => {
  setError(MESSAGES_STATUS.LOADING);
  if (mail === '' || password === '') {
    setError(MESSAGES_STATUS.ERROR);
    return;
  }

  try {
    const response = await post({
      endpoint: '/users/login',
      params: {
        email: mail,
        password,
      },
    });
    login(response.data);
    redirect('/');
    setError(MESSAGES_STATUS.OK);
  } catch (e) {
    toast(
      {
        type: 'warning',
        icon: 'info',
        title: 'Warning Toast',
        description: e.response.data,
        animation: 'bounce',
        time: 5000,
        size: 'tiny',
      },
      () => {},
      () => {},
      () => {},
    );
    setError(MESSAGES_STATUS.ERROR);
  }
};

export default (): React.ReactNode => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<MESSAGES_STATUS>(MESSAGES_STATUS.NONE);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/static/mdma.png" />
          Log-in to your account
        </Header>
        <Form
          size="large"
          onSubmit={() => handleSubmit({ mail, password, setError })}
          error={error === MESSAGES_STATUS.ERROR}
          success={error === MESSAGES_STATUS.OK}
          loading={error === MESSAGES_STATUS.LOADING}
        >
          <Segment stacked>
            <Form.Input
              value={mail}
              onChange={(_, { value }) => {
                setMail(value);
              }}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              onChange={(_, { value }) => {
                setPassword(value);
              }}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/register">Sign Up</a>
        </Message>
        <SemanticToastContainer />
      </Grid.Column>
    </Grid>
  );
};

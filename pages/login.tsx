import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Header, Image, Message } from 'semantic-ui-react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import { post, MESSAGES_STATUS } from './../utils/Network';
import redirect from '../utils/redirect';

type SubmitProps = {
  mail: string;
  password: string;
  setError: Function;
};

const handleSubmit = async ({ mail, password, setError }: SubmitProps) => {
  setError(MESSAGES_STATUS.LOADING);
  if (mail === '' || password[0] !== password[1] || (password[0] === '' && password[1] === '')) {
    setError(MESSAGES_STATUS.ERROR);
  }

  try {
    const response = await post({
      endpoint: '/login',
      params: {
        email: mail,
        password: password[0],
      },
    });

    console.log('response', response);
    //TODO: ADD TOKEN IN COOKIES (cookie.set) AND CHECK IF COOKIE EXIST
    redirect('/');
    setError(MESSAGES_STATUS.OK);
  } catch (e) {
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
            {error ? <Message error header="Connection failed !" content="Invalid login or password." /> : null}
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

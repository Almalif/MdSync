import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { MESSAGES_STATUS, post } from '../utils/Network';
import redirect from '../utils/redirect';

type SubmitProps = {
  mail: string;
  password: Array<string>;
  setError: Function;
};

const handleSubmit = async ({ mail, password, setError }: SubmitProps) => {
  setError(MESSAGES_STATUS.LOADING);
  if (mail === '' || password[0] !== password[1] || (password[0] === '' && password[1] === '')) {
    setError(MESSAGES_STATUS.ERROR);
    return;
  }

  try {
    const response = await post({
      endpoint: '/users',
      params: {
        email: mail,
        password: password[0],
      },
    });
    if (response && response.data) await redirect('/login');
    setError(MESSAGES_STATUS.OK);
  } catch (e) {
    toast(
      {
        type: 'warning',
        icon: 'info',
        title: 'Warning Toast',
        description: e && e.response && e.response.data,
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
  const [password, setPassword] = useState<Array<string>>(['', '']);
  const [error, setError] = useState<MESSAGES_STATUS>(MESSAGES_STATUS.NONE);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/static/mdma.png" />
          Sign-in
        </Header>
        <Form
          size="large"
          onSubmit={() => handleSubmit({ mail, password, setError })}
          error={error === MESSAGES_STATUS.ERROR}
          success={error === MESSAGES_STATUS.OK}
          loading={error === MESSAGES_STATUS.LOADING}
        >
          <Segment stacked>
            <Form.Group widths="equal">
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
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                onChange={(_, { value }) => {
                  setPassword([value, password[1]]);
                }}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                error={error === MESSAGES_STATUS.ERROR}
              />
              <Form.Input
                onChange={(_, { value }) => {
                  setPassword([password[0], value]);
                }}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                error={error === MESSAGES_STATUS.ERROR}
              />
            </Form.Group>
            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/login">Sign In</a>
        </Message>
        <SemanticToastContainer />
      </Grid.Column>
    </Grid>
  );
};
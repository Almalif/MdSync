import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Header, Image, Message } from 'semantic-ui-react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import mdma from './mdma.png';

type SubmitProps = {
  login: string;
  password: string;
  setError: Function;
};

const handleSubmit = async ({ login, password, setError }: SubmitProps) => {
  if (login === '' || password === '') {
    setError(true);
  }
};

export default (): React.ReactNode => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={mdma} />
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={() => handleSubmit({ login, password, setError })} error>
          <Segment stacked>
            <Form.Input
              value={login}
              onChange={(_, { value }) => {
                setLogin(value);
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

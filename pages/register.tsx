import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Header, Image, Message } from 'semantic-ui-react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
// import mdma from '/public/mdma.png';

type SubmitProps = {
  mail: string;
  password: Array<string>;
  setError: Function;
};

const handleSubmit = async ({ mail, password, setError }: SubmitProps) => {
  if (mail === '' || password[0] !== password[1] || (password[0] === '' && password[1] === '')) {
    setError(true);
  }
};

export default (): React.ReactNode => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<Array<string>>(['', '']);
  const [error, setError] = useState<boolean>(false);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src='/static/mdma.png' />
          Sign-in
        </Header>
        <Form size="large" onSubmit={() => handleSubmit({ mail, password, setError })} error>
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
              />
            </Form.Group>
            {error ? <Message error header="Sign-in failed !" content="Password must be identical." /> : null}
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/login">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

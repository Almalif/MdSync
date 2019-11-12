import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { MESSAGES_STATUS, post } from '../utils/Network';

type SubmitProps = {
  mail: string;
  password: Array<string>;
  setError: Function;
  history: any;
};

const handleSubmit = async ({ mail, password, setError, history }: SubmitProps) => {
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
    if (response && response.data) await history.push('/login');
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

const Register = ({ t }: any) => {
  const history = useHistory();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<Array<string>>(['', '']);
  const [error, setError] = useState<MESSAGES_STATUS>(MESSAGES_STATUS.NONE);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <title>{t('title')}</title>
          {/* eslint-disable-next-line global-require */}
          <Image src={require('../static/mdma.png')} alt="mdma" />
          {t('header')}
        </Header>
        <Form
          size="large"
          onSubmit={() => handleSubmit({ mail, password, setError, history })}
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
                placeholder={t('email')}
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
                placeholder={t('password')}
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
                placeholder={t('passwordConfirm')}
                type="password"
                error={error === MESSAGES_STATUS.ERROR}
              />
            </Form.Group>
            <Button color="teal" fluid size="large">
              {t('register')}
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/login">{t('login')}</a>
        </Message>
        <SemanticToastContainer />
      </Grid.Column>
    </Grid>
  );
};

export default withTranslation('register')(Register);

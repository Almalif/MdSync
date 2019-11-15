import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Header, Image, Message } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { post, MESSAGES_STATUS } from '../utils/Network';
import { login } from '../utils/auth';

type SubmitProps = {
  mail: string;
  password: string;
  setError: Function;
  history: any;
};

const handleSubmit = async ({ mail, password, setError, history }: SubmitProps) => {
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
    await history.push('/');
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

const Login = (rest: any) => {
  const { t } = rest;
  const history = useHistory();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
            <Form.Input
              value={mail}
              onChange={(_, { value }) => {
                setMail(value);
              }}
              fluid
              icon="user"
              iconPosition="left"
              placeholder={process.env.REACT_APP_SERVER_URL}
            />
            <Form.Input
              onChange={(_, { value }) => {
                setPassword(value);
              }}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder={t('password')}
              type="password"
            />
            <Button color="teal" fluid size="large">
              {t('login')}
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="/register">{t('register')}</a>
        </Message>
        <SemanticToastContainer />
      </Grid.Column>
    </Grid>
  );
};

export default withTranslation('login')(Login);

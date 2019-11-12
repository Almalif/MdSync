import React from 'react';
import { Image, Menu, Flag } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import i18n from '../../utils/i18n';
import NavLinks from './nav';
import 'semantic-ui-css/semantic.min.css';
import { logout } from '../../utils/auth';

const Header = ({ title }: any) => {
  const history = useHistory();
  return (
    <Menu>
      <header>
        <title>{title || 'Page'}</title>
      </header>
      <div className="ui secondary  menu">
        <div>
          <Image
            /* eslint-disable-next-line global-require */
            src={require('../../static/mdma.png')}
            width="30px"
            alt="mdma"
          />
        </div>
        <div>{NavLinks()}</div>
        <Menu.Item
          style={{ marginLeft: '10px', color: 'red' }}
          onClick={() => {
            logout();
            history.push('/login');
          }}
        >
          Disconnect
        </Menu.Item>
        <Menu.Item>
          <Flag
            name="gb"
            onClick={async () => {
              await i18n.changeLanguage('en');
            }}
          />
          <Flag
            name="france"
            onClick={async () => {
              await i18n.changeLanguage('fr');
            }}
          />
        </Menu.Item>
      </div>
    </Menu>
  );
};

export default Header;

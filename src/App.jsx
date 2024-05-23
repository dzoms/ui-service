import React from "react";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home/Home';
import Error from './page/Error/Error';
import PrivateRoute from './components/misc/PrivateRoute';
import Navbar from './components/misc/Navbar';
import { Dimmer, Header, Icon } from 'semantic-ui-react';
import { config } from './Constants';


import CallPage from "./page/VideoCallPage/CallPage";
import SettingsMeeting from "./components/SettingsMeeting/SettingsMeeting";

const App = () => {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: 'dzoms-realm',
    clientId: 'dzoms-ui-service-client',
  });
  const initOptions = { pkceMethod: 'S256' };

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        // Дополнительная логика аутентификации
      }
    }
  };

  const loadingComponent = (
    <Dimmer inverted active={true} page>
      <Header style={{ color: '#4d4d4d' }} as='h2' icon inverted>
        <Icon loading name='cog' />
        <Header.Content>
          Keycloak is loading
          <Header.Subheader style={{ color: '#4d4d4d' }}>or running authorization code flow with PKCE</Header.Subheader>
        </Header.Content>
      </Header>
    </Dimmer>
  );

  // Функция для создания собрания
  const createMeeting = async () => {
    // Здесь должна быть логика для создания идентификатора собрания
    return "12345"; // Пример: возвращаем фиксированный ID собрания
  };

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} LoadingComponent={loadingComponent} onEvent={(event, error) => handleOnEvent(event, error)}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="//call/:meetingId" element={<CallPage />} />
          <Route path='/error' element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;
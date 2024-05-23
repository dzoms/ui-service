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
import { userSettingsApi } from "./components/SettingsUser/UserSettingsApi";
import  SettingsUser from "./components/SettingsUser/SettingsUser";


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
        console.log(keycloak)
        //console.log((await userContactApi.getUserContact(keycloak.token, keycloak.subject)).data)
        console.log("aaaaaaaaaaa")
        try {
          const response = await userSettingsApi.getUserSettings(keycloak.token, keycloak.subject);
          console.log(response)

          if(response.data === "") {
            const username = keycloak.tokenParsed.preferred_username;
            const userExtra = { avatar: username, username: username };
            
            const createResponse = await userSettingsApi.createUserSettings(keycloak.token, userExtra);
            
            console.log(createResponse)
            console.log('UserExtra created for ' + username);
            keycloak['avatar'] = createResponse.data.avatar;
          } else {
            keycloak['avatar'] = response.data.avatar;
          }
        } catch (error) {
          console.error("Error fetching or creating user settings:", error);
        }
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
          <Route path="//call/:meetingId" element={<PrivateRoute><CallPage /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><SettingsUser /></PrivateRoute>} />
          <Route path='/error' element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Dimmer, Header, Icon } from 'semantic-ui-react'
import { config } from './Constants'
import UserSettings from './components/UserSettings/UserSettings'
import { userSettingsApi } from './components/UserSettings/UserSettingsApi'
import Navbar from './components/misc/Navbar'
import PrivateRoute from './components/misc/PrivateRoute'
import Error from './page/Error/Error'
import Home from './page/Home/Home'
import CallPage from './page/VideoCallPage/CallPage'

const App = () => {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: 'dzoms-realm',
    clientId: 'dzoms-ui-service-client',
  })
  const initOptions = { pkceMethod: 'S256' }

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        console.log(keycloak)
        //console.log((await userContactApi.getUserContact(keycloak.token, keycloak.subject)).data)
        console.log('aaaaaaaaaaa')
        try {
          const response = await userSettingsApi.getUserSettings(keycloak.token, keycloak.subject)
          console.log(response)

          if (response.data === '') {
            const username = keycloak.tokenParsed.preferred_username
            const userExtra = { avatar: username, username: username }

            const createResponse = await userSettingsApi.createUserSettings(keycloak.token, userExtra)

            console.log(createResponse)
            console.log('UserExtra created for ' + username)
            keycloak['avatar'] = createResponse.data.avatar
          } else {
            keycloak['avatar'] = response.data.avatar
          }
        } catch (error) {
          console.error('Error fetching or creating user settings:', error)
        }
      }
    }
  }

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
  )

  // Функция для создания собрания
  const createMeeting = async () => {
    // Здесь должна быть логика для создания идентификатора собрания
    return '12345' // Пример: возвращаем фиксированный ID собрания
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} LoadingComponent={loadingComponent} onEvent={(event, error) => handleOnEvent(event, error)}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='//call/:meetingId'
            element={
              <PrivateRoute>
                <CallPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/settings'
            element={
              <PrivateRoute>
                <UserSettings />
              </PrivateRoute>
            }
          />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<Navigate to='/error' />} />
          <Route path='/user-settings' element={<UserSettings />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App

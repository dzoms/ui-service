import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Dimmer, Header, Icon } from 'semantic-ui-react'
import { config } from './Constants'
import Navbar from './components/misc/Navbar'
import Error from './page/Error/Error'
import Home from './page/Home/Home'

function App() {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: 'dzoms-realm',
    clientId: 'dzoms-ui-service-client',
  })
  const initOptions = { pkceMethod: 'S256' }

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        //let response = await moviesApi.getUserExtrasMe(keycloak.token)
        // if (response.status === 404) {
        //   const username = keycloak.tokenParsed.preferred_username
        //   //const userExtra = { avatar: username }
        //   //response = await moviesApi.saveUserExtrasMe(keycloak.token, userExtra)
        //   console.log('UserExtra created for ' + username)
        // }
        //keycloak['avatar'] = response.data.avatar
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

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} LoadingComponent={loadingComponent} onEvent={(event, error) => handleOnEvent(event, error)}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App

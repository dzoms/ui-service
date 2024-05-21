import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './page/Home/Home'
import Error from './page/Error/Error'
import { userContactApi } from './components/misc/UserContactApi.jsx'
import PrivateRoute from './components/misc/PrivateRoute.jsx'
import Navbar from './components/misc/Navbar'
import { Dimmer, Header, Icon } from 'semantic-ui-react'
import { config } from './Constants'

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
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/error' element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App

import Keycloak from 'keycloak-js'
import Home from './page/Home/Home.jsx'
import Entrance from './page/Entrance/Entrance.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = document.getElementById('root')

const keycloakConfig = {
  url: 'http://localhost:8282',
  realm: 'master',
  clientId: 'ui-service-client',
};

const kc = new Keycloak(keycloakConfig)

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    /* http client will use this header in every request it sends */
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
        path="/login"
        element={<Entrance/>} />
        <Route
        path="/home"
        element={<Home/>} />
      </Routes>
    </Router>
  );
}

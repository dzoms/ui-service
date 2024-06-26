const prod = {
  url: {
    KEYCLOAK_BASE_URL: "https://keycloak.herokuapp.com",
    API_BASE_URL: 'https://myapp.herokuapp.com',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: 'http://localhost:8083',
    API_USER_SETTINGS_SERVICE: 'http://localhost:8084',
    API_NOTIFICATION_SERVICE: 'http://localhost:8085',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

export const config = dev
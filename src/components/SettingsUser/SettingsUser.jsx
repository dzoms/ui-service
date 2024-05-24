import React, { useEffect, useState } from 'react'
import {userSettingsApi} from './UserSettingsApi'
import { handleLogError } from '../misc/Helpers'
import { Container, Form, Segment, Button, Divider, Grid } from 'semantic-ui-react'
import { getAvatarUrl } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function UserSettings() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [originalAvatar, setOriginalAvatar] = useState('')
  const [imageLoading, setImageLoading] = useState(false)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  useEffect(() => {
    const fetchUserExtras = async () => {
      try {
        const response = await userSettingsApi.getUserSettings(keycloak.token, keycloak.subject)
        const { username, avatar } = response.data
        setUsername(username)
        setAvatar(avatar)
        setOriginalAvatar(avatar)
      } catch (error) {
        handleLogError(error)
      }
    }
    fetchUserExtras()
  }, [keycloak.token])

  const handleSuffle = () => {
    setImageLoading(true)
    const newAvatar = username + Math.floor(Math.random() * 1000) + 1
    setAvatar(newAvatar)
  }

  const handleCancel = () => {
    navigate("/")
  }

  const handleSave = async () => {
    try {
      let username = keycloak.tokenParsed.preferred_username;
      const userExtra = { avatar, username }
      await userSettingsApi.createUserSettings(keycloak.token, userExtra)
      keycloak['avatar'] = avatar
      navigate("/")
    } catch (error) {
      handleLogError(error)
    }
  }

  const avatarImage = !avatar ? <></> :
    <img
      src={getAvatarUrl(avatar)}
      onLoad={() => setImageLoading(false)}
      alt='user-avatar'
    />

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <Container>
      <Grid centered>
        <Grid.Row>
          <Segment style={{ width: '330px' }}>
            <Form>
              <strong>Avatar</strong>
              <div style={{ height: 300 }}>
                {avatarImage}
              </div>
              <Divider />
              <Button fluid onClick={handleSuffle} color='blue' disabled={imageLoading}>Shuffle</Button>
              <Divider />
              <Button.Group fluid>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button.Or />
                <Button disabled={originalAvatar === avatar} onClick={handleSave} positive>Save</Button>
                <Button fluid color='red' onClick={handleLogout}>
                  Logout
                </Button>
              
              </Button.Group>
            </Form>
          </Segment>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default UserSettings

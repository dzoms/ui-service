import { useKeycloak } from '@react-keycloak/web'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Grid, Segment } from 'semantic-ui-react'
import { getAvatarUrl, handleLogError } from '../misc/Helpers'
import './UserSettings.css'
import { userSettingsApi } from './UserSettingsApi'

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
    navigate('/')
  }

  const handleSave = async () => {
    try {
      let username = keycloak.tokenParsed.preferred_username
      const userExtra = { avatar, username }
      await userSettingsApi.createUserSettings(keycloak.token, userExtra)
      keycloak['avatar'] = avatar
      navigate('/')
    } catch (error) {
      handleLogError(error)
    }
  }

  const avatarImage = !avatar ? <></> : <img src={getAvatarUrl(avatar)} onLoad={() => setImageLoading(false)} alt='user-avatar' className='user-avatar' />

  return (
    <Container className='user-settings-container'>
      <Grid centered>
        <Grid.Row>
          <Segment className='user-settings-segment'>
            <Form className='user-settings-form'>
              <h1>Смена аватара</h1>
              <div className='user-settings-avatar'>{avatarImage}</div>
              <Button className='user-settings-button' onClick={handleSuffle} color='blue' disabled={imageLoading}>
                Изменить
              </Button>
              <div className='user-settings-button-group'>
                <Button className='button cancel' onClick={handleCancel}>
                  Отменить
                </Button>
                <Button.Or />
                <Button className='button positive' disabled={originalAvatar === avatar} onClick={handleSave}>
                  Сохранить
                </Button>
              </div>
            </Form>
          </Segment>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default UserSettings

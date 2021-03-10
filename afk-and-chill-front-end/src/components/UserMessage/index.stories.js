import React from 'react'
import { actions } from '@storybook/addon-actions'
import UserMessage from './index'
import data from '../../fakeData'

const userMessage = {
  title: 'User Message',
  component: UserMessage,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <UserMessage 
  message={data[0].messages[0]}
  {...events}
  ></UserMessage>
)

export default userMessage;
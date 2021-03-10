import React from 'react'
import { actions } from '@storybook/addon-actions'
import UserMessage from './index'

const testMessage = {
      user: {
        _id: "user1",
        username: "Pineapple"
      },
      text: "Hello! How are you?",
      _id: "message1"
    }


export default {
  title: 'User Message',
  component: UserMessage,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <UserMessage 
  message={testMessage}
  {...events}
  ></UserMessage>
)

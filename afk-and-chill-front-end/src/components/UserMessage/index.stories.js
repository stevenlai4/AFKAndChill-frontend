import React from 'react'
import { actions } from '@storybook/addon-actions'
import UserComment from './index'

const testMessage = {
      user: {
        _id: "user1",
        username: "Pineapple"
      },
      text: "Hello World!",
      _id: "comment1"
    }


export default {
  title: 'User Comment',
  component: UserComment,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <UserComment 
  comment={testMessage}
  {...events}
  ></UserComment>
)

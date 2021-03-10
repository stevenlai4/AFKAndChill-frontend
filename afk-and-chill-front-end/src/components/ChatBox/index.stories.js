import React from 'react'
import ChatBox from './index'
import { actions } from '@storybook/addon-actions'
import data from '../../fakeData'

const events = actions({ submitMessage: 'Submit Message' })

const chatBox = {
  title: 'Chat box',
  component: ChatBox,
}

export const Default = () => (
  <ChatBox {...events} message={data[0]} />
)

export default chatBox;
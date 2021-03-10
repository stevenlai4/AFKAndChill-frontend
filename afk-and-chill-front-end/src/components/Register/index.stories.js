
import React from 'react'
import { actions } from '@storybook/addon-actions'

import Register from './index'

const register = {
  title: 'Register',
  component: Register,
}

const events = actions({ onSubmit: 'submit', onClose: 'close' })

export const Default = () => (
  <Register 
  {...events}
  ></Register>
)

export default register;
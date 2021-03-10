import React from 'react'
import { actions } from '@storybook/addon-actions'

import CommentForm from './index'

export default {
  title: 'Comment Form',
  component: CommentForm,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <CommentForm 
  {...events}
  ></CommentForm>
)

import React from 'react'
import PostDetails from './index'
import { actions } from '@storybook/addon-actions'

import data from '../../fakeData'

const events = actions({ submitComment: 'Submit Comment', likeClicked: 'like clicked' })

export default {
  title: 'Post Details',
  component: PostDetails,
}

export const WithComments = () => (
  <PostDetails {...events} post={data[0]} />
)


// export const NoComments = () => (
//   <PostDetails {...events} post={{...data[0], comments: [], totalComments: 0}} />
// )

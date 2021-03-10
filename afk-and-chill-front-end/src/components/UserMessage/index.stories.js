// import React from 'react'
// import { actions } from '@storybook/addon-actions'
// import UserMessage from './index'

// const testMessage = {
//       user: {
//         _id: "user1",
//         username: "Pineapple"
//       },
//       text: "Hello! How are you?",
//       text_id: "message1",
//       chat_id: "123456"
//     }


// export default {
//   title: 'User Message',
//   component: UserMessage,
// }

// const events = actions({ onSubmit: 'submit' })

// export const Default = () => (
//   <UserMessage 
//   message={testMessage}
//   {...events}
//   ></UserMessage>
// )


import React from 'react'
import { actions } from '@storybook/addon-actions'

import UserMessage from './index'

import data from '../../fakeData'

export default {
  title: 'User Message',
  component: UserMessage,
}

const events = actions({ onSubmit: 'submit' })

export const Default = () => (
  <UserMessage 
  comment={data[0].messages[0]}
  {...events}
  ></UserMessage>
)

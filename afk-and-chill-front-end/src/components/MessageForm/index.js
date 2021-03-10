import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { TextField, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
  },
  textField: {
    flexGrow: 2
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}))

export default function MessageForm({onSubmit}) {
  const classes = useStyles()

  const [message, setMessage] = useState("")

  const submit = event => {
    event.preventDefault()
    onSubmit({message})
    setMessage("")
  }

  return (
      <form onSubmit={submit} className={classes.form}>
      
        <TextField className={classes.textField} 
        value={message} 
        multiline 
        onChange={e => setMessage(e.target.value)} 
        label="Add a message"
        rowsMax={4}
        variant="filled"
        ></TextField>
        <div className={classes.buttonWrapper}><IconButton 
        type="submit" 
        ><SendIcon /></IconButton></div>
      </form>

  )
}
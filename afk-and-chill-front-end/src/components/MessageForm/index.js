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

export default function NewPost({onSubmit}) {
  const classes = useStyles()

  const [comment, setComment] = useState("")

  const submit = event => {
    event.preventDefault()
    onSubmit({comment})
    setComment("")
  }

  return (
      <form onSubmit={submit} className={classes.form}>
      
        <TextField className={classes.textField} 
        value={comment} 
        multiline 
        onChange={e => setComment(e.target.value)} 
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
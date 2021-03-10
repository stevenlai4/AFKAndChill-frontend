import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    // display: "flex"
    
  },
  avatar : {
    float: "left",
    marginRight: 10,
    marginBottom: 5
  },
  text: {
    paddingTop: 5,
  }
}))

export default function Comment({comment, className}) {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar className={classes.avatar}>{comment.user.username[0]}</Avatar>
      <Typography className={classes.text} variant="body2" color="textPrimary" component="p">
        <b>{comment.user.username}</b> {comment.text}
      </Typography>
    </div>
  )
}
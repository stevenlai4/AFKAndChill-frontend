import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, CardHeader, IconButton, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'

import CommentForm from '../MessageForm'
import UserComment from '../UserMessage'

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    height: 600,
    display: "flex",
  },
  media: {
    width: "60%"
  },
  otherData: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    justifyContent: "space-between",
    margin: "0 10px",
  },
  commentForm: {
    width: "100%"
  },
  comment: {
    margin: "10px 0"
  },
  comments: {
    overflowY: "scroll"
  }
})

export default function Post({className, post, submitComment, likeClicked}) {
  const classes = useStyles()

  const onComment = data => {
    submitComment({postId: post._id, text: data.message})
  }

  return (
    <Card className={`${classes.root} ${className}`}>

        <CardMedia className={classes.media}
          component="img"
          image={post.imageUrl}
        />

        <div className={classes.otherData}>
            <CardHeader
            avatar={
            <Avatar className={classes.avatar}>
                {post.username[0]}
            </Avatar>}
            title={post.username}
            />
            <CardContent className={classes.comments}>
            {post.messages.map(comment => (
            <UserComment key={comment.id} className={classes.comment} comment={comment}></UserComment>
            ))}

            </CardContent>
            <div>
                <CardActions>
                </CardActions>
                <CommentForm className={classes.commentForm} onSubmit={onComment}></CommentForm>
            </div>
        </div>
      
    </Card>
  )
}
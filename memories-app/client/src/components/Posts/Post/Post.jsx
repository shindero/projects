import React from 'react';
import useStyles from './styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, CircularProgress} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {deletePost, likePost} from '../../../actions/posts'
import {useSelector} from 'react-redux'
export  const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.users.user);
    console.log(user, post)
    return(
        <Card className={classes.card}>
           {post.selectedFile ? (
            <CardMedia 

            className={classes.media} 
            image={post.selectedFile} 
            title={post.title}
            />
           ): <CircularProgress/>
            }
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {user.result._id === post.creator && ( <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            )}
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `# ${tag}`)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
            <CardContent>
                 <Typography variant="body2" color="textSecondary" >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user}color="primary" onClick={()=> dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp;
                    Like
                    &nbsp;
                    {post.likecount}
                </Button> 
                {user.result._id === post.creator && (<Button size="small" color="primary" onClick={()=> dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                </Button>)}
                
            </CardActions>
            
        </Card>
    )

}

export default Post;
import React, {Component} from 'react';
import PostItem from "./PostItem";

class PostList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [
                {
                    author: 'Lucas Santos',
                    post: 'Good morning friends!'
                },
                {
                    author: 'Joana',
                    post: 'LOL'
                },
                {
                },
                {

                }
            ]
        }
    }

    render() {
        return(
            <>
                {this.state.posts.map(post=><PostItem author={post.author} post={post.post}/>)}
            </>
        )
    }
}

export default PostList;
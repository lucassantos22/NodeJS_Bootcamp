import React, {Component} from 'react';
import '../style/Content.css';
import PostList from "./PostList";

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            author:'Lucas',
            post: 'Olá'
        }
    }
    render() {
        return(
            <>
                <PostList/>
            </>
        )
    }
}

export default Content

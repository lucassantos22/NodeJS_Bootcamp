import React, {Component} from 'react';
import propTypes from 'prop-types';
import '../style/PostItem.css'

class PostItem extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        author: 'Lucas Santos',
        post: 'Good morning friends!'
    };

    static propTypes = {
        author: propTypes.string,
        post: propTypes.string
    };

    render() {
        return (
            <>
                <div class='post-item'>
                    <p class='author'>{this.props.author}</p>
                    <p class='post'>{this.props.post}</p>
                </div>
            </>
        )
    }

}

export default PostItem;
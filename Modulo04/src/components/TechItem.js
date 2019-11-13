import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TechItem extends Component{
    static defaultProps = {
        tech: 'Oculto'
    };
    static propTypes = {
        tech: PropTypes.string,
        onDelete: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
    }
    render() {
        return(
            <>
                <li key={this.props.tech}>
                    {this.props.tech}
                    <button type="button" onClick={this.props.onDelete}>Remover item</button>
                </li>
            </>
        )
    }
}

export default TechItem;
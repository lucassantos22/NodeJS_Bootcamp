import React, {Component} from 'react';
import '../style/Header.css';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <header>
                    <span>facebook.</span>
                </header>
            </>
        );
    }
}

export default Header;
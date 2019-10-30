import React, {Component} from 'react'

class TechList extends Component{
    constructor(props){
        super(props);
        this.state = {
            techs: ['NodeJs', 'ReactJs', 'VueJs']
        };
    }

    render(){
        return(
            <ul>
                <li>Node.Js</li>
                <li>React</li>
                <li>VueJs</li>
            </ul>
        )
    }
}

export default TechList;
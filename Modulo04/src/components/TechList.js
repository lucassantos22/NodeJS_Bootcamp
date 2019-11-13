import React, {Component} from 'react'
import TechItem from "./TechItem";

class TechList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techs: [],
            newTech: ''
        };
    }

    // Executa assim que o componente aparece em tela
    componentDidMount() {
        this.setState({techs: JSON.parse(localStorage.getItem('Techs'))});
    }

    // Sempre que houver alterações nas props ou estado
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.techs !== prevState.techs) {
            localStorage.setItem('Techs', JSON.stringify(this.state.techs))
        }
    }

    // Executado quando componente deixa de existir
    componentWillUnmount() {
    }

    handleInputChange = e => {
        this.setState({newTech: e.target.value})
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        });
    };

    handleDelete = tech => {
        this.setState({techs: this.state.techs.filter(t => t !== tech)})
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>{this.state.newTech}</h1>
                    <ul>
                        {this.state.techs.map(tech =>
                            <TechItem
                                key={tech}
                                tech={tech}
                                onDelete={() => this.handleDelete(tech)}
                            />)}
                    </ul>
                    <input type="text"
                           onChange={this.handleInputChange}
                           value={this.state.newTech}/>
                    <button type="submit">Adicionar tecnologia</button>
                </form>
            </>
        )
    }
}

export default TechList;
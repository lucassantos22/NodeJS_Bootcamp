import React, {Component} from 'react';
import {FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa';
import {Link} from 'react-router-dom'

import Api from '../../services/api';
import {Form, SubmitButton, List} from '../../styles/main-styles';
import Container from '../../components/Container';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRepo: '',
            repositories: [],
            loading: false
        }
    }

    render() {
        return (
            <Container>
                <h1>
                    <FaGithubAlt/>
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={this.state.newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={this.state.loading}>
                        {this.state.loading ? <FaSpinner color={'#FFF'}/> : <FaPlus color="FFF" size={14}/>}
                    </SubmitButton>
                </Form>
                <List>
                    {this.state.repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes </Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }

    handleInputChange = e => {
        this.setState({newRepo: e.target.value});
    };

    handleSubmit = async e => {
        try{
            for(const repository of this.state.repositories){
                if(repository.name === this.state.newRepo){
                    throw new Error('Repositório duplicado');
                }
            }
            this.setState({loading: true});
            e.preventDefault();
            let response;
            try{
                response = await Api.get(`/repos/${this.state.newRepo}`);
            }catch (e) {
                throw new Error('Repositório inválido!');
            }
            const data = {
                name: response.data.full_name
            };
            this.setState({
                repositories: [...this.state.repositories, data],
            });
        }catch (e) {
            alert(e);
        }finally {
            this.setState({
                newRepo: '',
                loading: false
            });
        }
    };

    componentDidMount(state) {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({repositories: JSON.parse(repositories)});
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.repositories !== this.state.repositories) {
            localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
        }
    }
}
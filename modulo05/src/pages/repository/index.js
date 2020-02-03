import React, {Component} from 'react';
import Api from '../../services/api'
import propTypes from 'prop-types'
import {Loading, Owner, IssueList} from './styles';
import Container from '../../components/Container';
import {Link} from 'react-router-dom';

export default class Repository extends Component {
    static propTypes = {
        match: propTypes.shape({
           params: propTypes.shape({
               repository: propTypes.string
           })
        }).isRequired
    };
    async componentDidMount(){
        const {match} = this.props;
        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            Api.get(`/repos/${repoName}`),
            Api.get(`/repos/${repoName}/issues`, {
                params:{
                    state: 'open',
                    per_page: 5
                }
            })
        ]);
        this.setState(
            {loading:false,
                repository: repository.data,
                issues: issues.data
            }
        )
    }
    constructor(props){
        super(props);
        this.state = {
            repository: {},
            issues: [],
            loading: true
        }
    }
    render() {
        const {repository, issues, loading} = this.state;
        if(loading){
            return <Loading>Carregando</Loading>
        }
        return (
        <Container>
            <Owner>
                <Link to='/'>Voltar aos repositórios</Link>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <IssueList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                { /* */}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>
        </Container>
        )
    }

}

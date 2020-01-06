import React, {Component} from 'react';
import Api from '../../services/api'
import propTypes from 'prop-types'

export default class Repository extends Component {
    static propTypes = {
        match: propTypes.shape({
           params: propTypes.shape({
               repository: propTypes.string
           })
        }).isRequired,

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
        return <h1>Repositório</h1>
    }

}

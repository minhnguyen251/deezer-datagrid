import React, {Component} from 'react';
import PropTypes from "prop-types";
import _ from 'underscore';
import './SearchBar.scss';
import Config from '../../Config';

const getUpdateResult = (result) => (prevState) => ({
    data: prevState.data,
    newData: result.data,
    isError: false,
    isFetching: false,
});

const setResult = (result) => () => ({
    data: result.data,
    isError: false,
    isFetching: false,
});

const setError = () => ({
    isError: true,
    isFetching: false,
});

const inputRequest = (query, page) => `${Config.API.enable_cors_header_url}https://api.deezer.com/search?q=track:"${query}"&limit=${Config.API.limit_object}&index=${page}`;

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isError: false,
            isSubmitted: false,
            page: 0,
            data: [],
            newData: [],
        };
        this.submitQuery = this.submitQuery.bind(this);
    };

    /**
     * Promise function to fetch data from API
     * @param query:string
     * @param page:number
     * @return {Promise<{}>|Promise<Response | {}>}
     */
    fetchData(query, page) {
        if (this.state.isFetching)
            return Promise.reject('Request in Progress');

        this.setState({isFetching: true});
        return fetch(
            inputRequest(query, page),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => this.setResult(result, page))
            .catch(error => this.setState(setError))
    }

    /**
     *
     * @param result
     * @param page
     */
    setResult = (result, page) => {
        page === 0 ?
            this.setState(setResult(result))
            : this.setState(getUpdateResult(result));

        // Merge into one array without duplicates
        this.data = _.union(this.state.data, this.state.newData);
        // Disable loading
        this.props.loading();
        this.props.searchQuery(this.data);
    };

    /**
     * Return result only if the input value is not empty
     * @param event
     */
    submitQuery(event) {
        event.preventDefault();

        let searchVal = this.refInput.value;

        if (searchVal.replace(/\s/g, '') === '')
            return false;

        // Enable loading
        this.props.loading();
        this.setState({isSubmitted: true});

        // Send data
        this.fetchData(searchVal, 0);
    }

    onScroll() {
        let nearBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10;
        if (!this.state.isFetching && nearBottom) {
            this.setState({page: this.state.page + Config.API.limit_object});
            console.log(this.refInput.value + '----' + this.state.page);
            this.fetchData(this.refInput.value, this.state.page);
        }
    }

    componentDidMount() {
        this.refInput.focus();
        window.addEventListener("scroll", this.onScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll.bind(this));
    }

    render() {
        return (
            <div className={`search__ctn ${this.state.isSubmitted ? 'search--submitted' : ''}`}>
                <form onSubmit={this.submitQuery}>
                    <input type="text" ref={input => this.refInput = input}
                           placeholder={Config.TEXT.search_input_placeholder}
                           aria-label={Config.TEXT.search_input_placeholder}/>

                    <button type="submit" name={Config.TEXT.search_btn}>
                        <img src={Config.IMAGE.search_btn} alt={Config.TEXT.search_btn}/>
                    </button>
                </form>

            </div>
        );
    }
}

SearchBar.propTypes = {
    searchQuery: PropTypes.func.isRequired,
    errorScreen: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    receivedSongs: PropTypes.func,
};

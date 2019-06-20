import React, {Component} from 'react';
import PropTypes from "prop-types";
import './SearchBar.scss';
import Config from '../../Config';
import DataHelper from "../../helpers/DataHelper";

// Set state when updating results
const getUpdateResult = (result) => (prevState) => ({
    data: [...prevState.data, ...result.data],
    isError: false,
    isFetching: false,
});

// Set state when first getting results
const setResult = (result) => () => ({
    data: result.data,
    isError: false,
    isFetching: false,
});

// API url for fetching
const inputRequest = (query, page) => `${Config.API.enable_cors_header_url}https://api.deezer.com/search?q=track:"${query}"&limit=${Config.API.limit_object}&index=${page}`;

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isSubmitted: false,
            page: 0,
            data: [],
        };
        this.submitQuery = this.submitQuery.bind(this);
    };

    /**
     * Fetch data from API
     * @param query:string
     * @param page:number
     * @return {Promise<{}>|Promise<Response | {}>}
     */
    fetchData(query, page) {
        if (this.state.isFetching)
            return Promise.reject('Request in Progress');

        this.setState({isFetching: true});
        this.props.loading();
        return fetch(
            inputRequest(query, page),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => this.getResult(result, page))
            .catch(error => this.props.errorScreen)
    }

    /**
     * Get results based on page
     * @param result
     * @param page
     */
    getResult = (result, page) => {
        page === 0 ?
            this.setState(setResult(result),this.sendBackData)
            : this.setState(getUpdateResult(result),this.sendBackData)
    };

    // Send data to other components
    sendBackData = () => {
        // Disable loading
        this.props.loading();
        this.props.searchQuery(DataHelper.arrayUnique(this.state.data));
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

    // Infinite scroll
    onScroll() {
        let nearBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;
        if (!this.state.isFetching && nearBottom) {
            this.setState({page: this.state.page + Config.API.limit_object});
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
    loading: PropTypes.func.isRequired
};

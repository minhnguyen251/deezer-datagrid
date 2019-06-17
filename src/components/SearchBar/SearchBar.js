import React, {Component} from 'react';
import PropTypes from "prop-types";
import './SearchBar.scss';
import Config from '../../Config';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    };

    getData(e) {
        e.preventDefault();
        let searchVal = this.refInput.value;
        return fetch(
            `${Config.ENABLE_CORS_HEADER_URL + Config.API_URL}"${searchVal}"`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                    response.json().then(data => this.props.searchQuery(data))
                }
            ).catch(message => this.props.errorScreen())
    }

    componentDidMount() {
        this.refInput.focus();
    }

    render() {
        return (
            <div className="search__ctn">
                <form onSubmit={this.getData}>
                    <h1>{Config.TEXT.welcome}</h1>
                    <div className="flexbox">
                        <input type="text" ref={(input) => this.refInput = input} placeholder={Config.TEXT.search_input_placeholder}
                               aria-label={Config.TEXT.search_input_placeholder}/>

                        <button type="submit">
                            <img src={Config.IMAGE.search_btn} alt={Config.TEXT.search_btn}/>
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

SearchBar.propTypes = {
    searchQuery: PropTypes.func,
    errorScreen: PropTypes.func
};

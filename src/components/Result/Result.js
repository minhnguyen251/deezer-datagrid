import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Result.scss';
import Config from '../../Config';

export default class Result extends Component {
    render() {
        console.log(this.props.searchResult);
        return (
            <div className="result__ctn">
            </div>
        );
    }
}

Error.propTypes = {
    searchResult: PropTypes.object
};

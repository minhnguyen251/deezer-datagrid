import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Error.scss';
import Config from '../../Config';

export default class Error extends Component {

    render() {
        return (
            <div className="error__ctn">
            </div>
        );
    }
}

Error.propTypes = {
    searchQuery: PropTypes.func
};

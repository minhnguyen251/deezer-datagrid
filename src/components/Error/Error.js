import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Error.scss';
import Config from '../../Config';

export default class Error extends Component {

    render() {
        return (
            <div className="error__ctn">
                {Config.TEXT.error_message}
            </div>
        );
    }
}

Error.propTypes = {
    searchQuery: PropTypes.func
};

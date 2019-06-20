import React, {Component} from 'react';
import PropTypes from "prop-types";
import Config from "../../Config"
import './Filter.scss';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.onKeyUpFilter = this.onKeyUpFilter.bind(this);
    }

    onKeyUpFilter(event) {
        this.props.filter(event.target.value);
    }

    render() {
        return (
            <div className="filter__input">
                <input onKeyUp={this.onKeyUpFilter} placeholder={Config.TEXT.filter_text}/>
            </div>
        )
    }
}

Filter.propTypes = {
    filter: PropTypes.func,
};

import React, {Component} from 'react';
import './Loading.scss';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading__ctn">
                <span className="first-bar"/>
                <span className="second-bar"/>
                <span className="third-bar"/>
                <span className="fourth-bar"/>
            </div>
        );
    }
}
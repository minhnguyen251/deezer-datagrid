import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Result.scss';
import Config from '../../Config';
import Loading from "../Loading/Loading";

export default class Result extends Component {
    render() {
        const songs = this.props.songs;
        console.table(songs);
        return (
            <div className="result__ctn">
                {
                    this.props.loading ?
                        <Loading />
                        :
                        <div>
                            {songs.map(song => {

                            })}
                        </div>
                }

            </div>
        )
            ;
    }
}

Error.propTypes = {
    loading: PropTypes.bool,
};

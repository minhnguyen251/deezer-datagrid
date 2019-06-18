import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Result.scss';
import Config from '../../Config';

export default class Result extends Component {
    render() {
        const songs = this.props.songs;
        console.log(songs);
        let song = songs.map(song => (
            <tr key={song.id} className={`id--${song.id}`}>
                <td>{song.index}</td>
                <td><img src={song.album.cover} alt={song.album.title}/></td>
                <td>{song.artist.title}</td>
                <td>{song.artist.name}</td>
                <td></td>
                <td></td>
            </tr>
        ));
        return (
            <div className="result__ctn">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>{Config.TEXT.table.track}</th>
                        <th>{Config.TEXT.table.artist}</th>
                        <th>{Config.TEXT.table.duration}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {song}
                    </tbody>
                </table>
            </div>
        );
    }
}

Error.propTypes = {
    loading: PropTypes.bool,
};

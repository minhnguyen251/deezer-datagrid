import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Result.scss';
import Config from '../../Config';

export default class Result extends Component {
    render() {
        console.log(this.props.songs);
        let song = this.props.songs.map(song => (
            <tr key={song.id} className={`id--${song.id}`}>
                <td className="artist-picture">
                    <img src={song.artist.picture} alt={song.artist.name}/>
                </td>
                <td>{song.title}</td>
                <td>{song.artist.name}</td>
                <td>{song.album.title}</td>
            </tr>
        ));
        return (
            <div className="result__ctn">
                <table>
                    <thead>
                    <tr>
                        <th>{Config.TEXT.table.albumName}</th>
                        <th>{Config.TEXT.table.track}</th>
                        <th>{Config.TEXT.table.artist}</th>
                        <th>{Config.TEXT.table.duration}</th>
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
    songs: PropTypes.array,
};

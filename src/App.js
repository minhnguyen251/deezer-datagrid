import React, {Component} from 'react';
import 'normalize.css';
import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';
import Result from './components/Result/Result';
import Error from './components/Error/Error';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: false,
            searching: true,
            errorScreen: false,
            data: []
        }
    }

    handleSearchQuery = (data) => {
        this.setState({
            result: true,
            data: data
        })
    };

    handleErrorScreen = () => this.setState({errorScreen: true});

    render() {
        return (
            <div className="app__ctn">

                <SearchBar searchQuery={this.handleSearchQuery} searching={this.state.searching}
                           errorScreen={this.handleErrorScreen}/>

                {this.state.result ?
                    <Result searchResult={this.state.data}/>
                    : null
                }

                {this.state.errorScreen ?
                    <Error/>
                    : null
                }
            </div>
        );
    }
}
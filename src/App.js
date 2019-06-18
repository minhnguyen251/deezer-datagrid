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
            submitted: false,
            loading: true,
            errorScreen: false,
            songs: []
        }
    }

    handleSearchQuery = (data) => {this.setState({songs: data.data})};
    handleErrorScreen = () => this.setState({errorScreen: true});
    handleLoading = () => this.setState({loading: false});
    handleSubmitted = () => this.setState({submitted: true});

    render() {
        return (
            <div className={`app__ctn ${this.state.submitted ? 'app--submitted' : ''}`}>

                <SearchBar searchQuery={this.handleSearchQuery}
                           loading={this.handleLoading}
                           submitted={this.handleSubmitted}
                           submittedState={this.state.submitted}
                           errorScreen={this.handleErrorScreen}/>

                {this.state.submitted ?
                    <Result songs={this.state.songs} loading={this.state.loading}/>
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
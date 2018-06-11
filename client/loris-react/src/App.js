import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import './App.css';

import ButtonAppBar from './jsx/AppBar'
import SwipeableTemporaryDrawer from './jsx/SwipeableDrawer'

class App extends Component {
    state = {
        response: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div className='App'>
                <ButtonAppBar/>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'>Welcome to React</h1>
                </header>
                <p className='App-intro'>
                    {this.state.response}
                </p>
                <SwipeableTemporaryDrawer>
                    <button>NO</button>N
                </SwipeableTemporaryDrawer>
            </div>
        );
    }
}

export default App;

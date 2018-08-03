import React, { Component } from 'react';
import Sidebar from './jsx/Sidebar'
import SidebarContent from './jsx/SidebarContent';
import 'typeface-roboto';
import './App.css';

class App extends Component {
    state = {
        response: '',
        docked: true,
        open: true,
        pullRight: false,
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200)
            throw Error(body.message);

        return body;
    };

    render() {
        const sidebar_content = <SidebarContent />;

        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Welcome to Loris</h1>
                </header>
                <Sidebar
                    content={sidebar_content}
                    open={true}
                    docked={true}>
                </Sidebar>
                <div style={{
                    width: '100%',
                    color: 'white',
                    height: '100px',
                    background: 'white',
                    verticalAlign: 'top',
                    display: 'table-cell'
                }}>
                    <p className='App-intro'>
                        {this.state.response}
                    </p>
                </div>
            </div>
        );
    }
}

export default App;

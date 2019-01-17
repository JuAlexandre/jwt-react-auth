import React from 'react';

import AuthService from '../AuthService';
import withAuth from '../../functions/withAuth';
import logo from '../../images/logo.svg';
import './App.css';

const Auth = new AuthService();

class App extends React.Component {
    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/login');
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Welcome <span className='username'>{ this.props.user.username }</span></h1>
                    <button
                        type='button'
                        className='form-submit'
                        onClick={this.handleLogout.bind(this)}
                    >
                        Logout
                    </button>
                </header>
            </div>
        );
    }
}

export default withAuth(App);

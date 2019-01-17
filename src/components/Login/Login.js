import React from 'react';

import AuthService from '../AuthService';
import './Login.css';

const Auth = new AuthService();

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    };

    componentWillMount() {
        if (Auth.loggedIn()) {
            this.props.history.replace('/');
        }
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    handleSubmit = event => {
        event.preventDefault();

        Auth.login(this.state.username, this.state.password)
            .then(() => this.props.history.replace('/'))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form method='POST' onSubmit={this.handleSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input className="form-submit" value="SUBMIT" type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;

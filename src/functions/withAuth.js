import React from 'react';

import AuthService from '../components/AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();

    return class AuthWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null,
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({ user: profile });
                } catch (error) {
                    console.log(error);
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            } else {
                return null;
            }
        }
    }
}

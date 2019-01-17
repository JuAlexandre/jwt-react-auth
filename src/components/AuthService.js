import decode from 'jwt-decode';

class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8000' // API server domain
    }

    login = (username, password) => {
        // Get a token from API server using the fetch API
        return this.fetch(`${this.domain}/login_check`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(response => {
                this.setToken(response.token); // Setting the token in localStorage
                return Promise.resolve(response);
            })
            .catch(error => console.log(error));
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localStorage
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired
                console.log('Token is expired');
                return true;
            } else {
                console.log('Token is valid');
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    };

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    };

    getProfile = () => {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    };

    fetch = (url, options) => {
        // Performs API calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer [TOKEN]
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this.checkStatus)
            .then(response => response.json())
            .catch(error => console.log(error));
    };

    checkStatus = (response) => {
        // Raises ans error in case response status is'nt a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

export default AuthService;

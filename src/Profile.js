const ENDPOINT_BASE = process.env.REACT_APP_ENDPOINT_BASE;
class Profile {
    /**
     * Profile representiation.
     * @constructor
     */
    constructor(callback) {
        // Set authentiaction to false.
        this.authenticated = false;
        // We check here to see if there does exist tokens stored in cookies. If so, we can automatically retrieve user data without having them log in again.
        // TOOD: Implement the check stated above ^.
        // Function binds.
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.logout = this.logout.bind(this);
    }

    /**
     * This method logs in a user. If successful, it will set the access and refresh tokens for JWT. It calls the retrieve function as well, setting user info.
     * @param {String} email The email that the user logs in with.
     * @param {String} password The password that the user logs in with.
     * @param {Function} callback Function should take in the current profile. (New profile, per se).
     */
    login(email, password, callback) {
        fetch(`${ENDPOINT_BASE}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                this.authenticated = false;
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status === 'success') {
                    console.log('going to get user info');
                    this.getUserInfo(callback);
                } else {
                    console.log(message);
                }
            });
        });
    };
    /**
     * This method registers a user. If successful, it will set the access and refresh tokens for JWT. It calls the retrieve function as well, setting user info.
     * @param {String} firstName The first name that the user registers with.
     * @param {Number} age The age that the user registers with.
     * @param {String} email The email that the user registers with.
     * @param {String} password The password that the user registers with.
     * @param {Function} callback Function should take in the current profile. (New profile, per se).
     */
    register(firstName, age, email, password, callback) {
        fetch(`${ENDPOINT_BASE}/api/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                first_name: firstName,
                age: age,
                email: email,
                password: password,
            }),
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                this.authenticated = false;
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status === 'success') {
                    this.getUserInfo(callback);
                } else {
                    console.log(message);
                }
            });
        });
    };
    /**
     * Logs out the user.
     * @param {Function} callback Function should take in the current profile. (New profile, per se).
     */
    logout(callback) {
        fetch(`${ENDPOINT_BASE}/api/logout`, {
            method: 'POST',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                this.authenticated = true;
                return;
            }
            this.authenticated = false;
            this.userInfo = null;
            callback(this);
        });
    }
    /**
     * Gets user profile info.
     * @param {Function} callback Function should take in the current profile. (New profile, per se).
     */
    getUserInfo(callback) {
        fetch(`${ENDPOINT_BASE}/api/user/get_user_info`, {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                this.authenticated = false;
                return;
            }
            console.log(response);
            response.json().then((data) => {
                const {status, message, data: userInfo} = data;
                if (status === 'success') {
                    console.log(data);
                    this.userInfo = userInfo;
                    this.authenticated = true;
                    callback(this);
                } else {
                    console.log(message);
                }
            });
        });
    }
    /**
     * Checks the status code of the response.
     *
    /**
     * This method retrieves user data using the access token.
     * @param {Function} callback function should have parameters: String message. If successful, no message should be passed in on callback.
     */
    dashboard(callback) {
        console.log(this.accessToken + ' ');
        fetch(`${ENDPOINT_BASE}/api/dashboard`, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                callback('Interal Error. Please contact support.');
                this.authenticated = false;
                return;
            }
            response.json().then((data) => {
                const {current_user: currentUser, reports, symptoms} = data;
                this.userInfo = currentUser;
                this.reports = reports;
                this.sypmtoms = symptoms;
                callback();
            });
        });
    }
}
export default Profile;

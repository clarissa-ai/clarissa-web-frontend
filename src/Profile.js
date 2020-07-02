class Profile {
    /**
     * Profile representiation.
     * @constructor
     */
    constructor() {
        // Set authentiaction to false.
        this.authenticated = false;
        // We check here to see if there does exist tokens stored in cookies. If so, we can automatically retrieve user data without having them log in again.
        // TOOD: Implement the check stated above ^.
        // Function binds.
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.retrieve = this.retrieve.bind(this);
    }

    /**
     * This method logs in a user. If successful, it will set the access and refresh tokens for JWT. It calls the retrieve function as well, setting user info.
     * @param {String} email The email that the user logs in with.
     * @param {String} password The password that the user logs in with.
     * @param {Function} callback Function should have parameters: String message. If successful, no message should be passed in on callback.
     */
    login(email, password, callback) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) => {
            if (!response.ok) {
                callback('Internal Error. Please contact support.');
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status) {
                    const {access_token: accessToken, refresh_token: refreshToken} = data;
                    this.accessToken = accessToken;
                    this.refreshToken = refreshToken;
                    this.authenticated = true;
                    this.retrieve(callback);
                } else {
                    callback(message);
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
     * @param {Function} callback function should have parameters: String message. If successful, no message should be passed in on callback.
     */
    register(firstName, age, email, password, callback) {
        fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                age: age,
                email: email,
                password: password,
            }),
        }).then((response) => {
            if (!response.ok) {
                callback('Internal Error. Please contact support.');
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status) {
                    const {access_token: accessToken, refresh_token: refreshToken} = data;
                    this.accessToken = accessToken;
                    this.refreshToken = refreshToken;
                    this.authenticated = true;
                    this.retrieve(callback);
                } else {
                    callback(message);
                }
            });
        });
    };
    /**
     * This method retrieves user data using the access token.
     * @param {Function} callback function should have parameters: String message. If successful, no message should be passed in on callback.
     */
    retrieve(callback) {
        console.log(this.accessToken + ' ');
        fetch('/api/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken,
            },
        }).then((response) => {
            if (!response.ok) {
                callback('Interal Error. Please contact support.');
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

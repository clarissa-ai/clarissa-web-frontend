class Profile {

    /**
     * Profile representiation.
     * @constructor
     */
    constructor() {
        //Set authentiaction to false.
        this.authenticated = false;
        //We check here to see if there does exist tokens stored in cookies. If so, we can automatically retrieve user data without having them log in again.
        // TOOD: Implement the check stated above ^.
        //Function binds.
        this.Login = this.Login.bind(this);
        this.Register = this.Register.bind(this);
        this.Retrieve = this.Retrieve.bind(this);
    }

    /**
     * This method logs in a user. If successful, it will set the access and refresh tokens for JWT. It calls the retrieve function as well, setting user info.
     * @param {String} email The email that the user logs in with.
     * @param {String} password The password that the user logs in with.
     * @param {Function} callback Function should have parameters: String message. If successful, no message should be passed in on callback.
     */
    Login = (email, password, callback) => {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => {
            if(!response.ok) {
                callback("Internal Error. Please contact support.");
                return;
            }
            response.json().then((data) => {
                let { status, message } = data;
                if (status) {
                    let { access_token, refresh_token } = data;
                    this.access_token = access_token;
                    this.refresh_token = refresh_token;
                    this.authenticated = true;
                    this.Retrieve(callback);
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
    Register = (firstName, age, email, password, callback) => {
        fetch("/api/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                age: age,
                email: email,
                password: password
            })
        }).then((response) => {
            if(!response.ok) {
                callback("Internal Error. Please contact support.");
                return;
            }
            response.json().then((data) => {
                let { status, message } = data;
                if (status) {
                    let { access_token, refresh_token } = data;
                    this.access_token = access_token;
                    this.refresh_token = refresh_token;
                    this.authenticated = true;
                    this.Retrieve(callback);
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
    Retrieve = (callback) => {
        console.log(this.access_token + " ");
        fetch("/api/dashboard", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.access_token
            }
        }).then((response) => {
            if (!response.ok) {
                callback("Interal Error. Please contact support.");
                return;
            }
            response.json().then((data) => {
                let { current_user, reports, symptoms } = data;
                this.userInfo = current_user;
                this.reports = reports;
                this.sypmtoms = symptoms;
                callback();
            });
        });
    }
}
export default Profile;
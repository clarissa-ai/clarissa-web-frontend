import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const Router = (props) => {
    // State to control custom routing.
    const [routes, setRoutes] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT_BASE}/api/routes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status === 'success') {
                    setRoutes(data.routes);
                } else {
                    console.log(message);
                }
            });
        });
    }, [setRoutes]);

    const redirect = [];
    if (routes) {
        console.log(routes);
        Object.keys(routes).forEach((key) => redirect.push(<Redirect key={key} from={key} to={routes[key]} />));
    };
    console.log(redirect);

    return (
        redirect
    );
};

export default Router;

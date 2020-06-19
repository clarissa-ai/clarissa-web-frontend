import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Grid, CircularProgress} from '@material-ui/core';

import {LoaderContext} from 'App.jsx';

const LoadingPage = (props) => {
    return (
        <Grid container={true} direction='column' justify='center' alignItems='center'>
            <Grid container={true} direction='row' justify='center' alignItems='center'>
                <CircularProgress />
            </Grid>
        </Grid>
    );
};

const Loader = (props) => {
    const loaderClass = useContext(LoaderContext);
    const [loading, setLoading] = useState(loaderClass.status());
    useEffect(() => {
        setLoading(loaderClass.status());
    }, [setLoading]);

    return (
        loading ? <LoadingPage /> : props.children
    );
};
Loader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
export default Loader;


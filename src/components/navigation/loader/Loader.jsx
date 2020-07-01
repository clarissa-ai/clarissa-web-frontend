import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Grid, CircularProgress} from '@material-ui/core';
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
    return (
        props.loading ? <LoadingPage /> : props.children
    );
};
Loader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    loading: PropTypes.bool.isRequired,
};
export default Loader;


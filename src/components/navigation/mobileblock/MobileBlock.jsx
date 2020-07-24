import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as LogoWithName} from 'images/LogoWithName.svg';
import {Grid, Typography} from '@material-ui/core';

const BlockPage = (props) => {
    return (
        <Grid container={true} direction='column' justify='center' alignItems='center' style={{height: '100vh', width: '100vw'}}>
            <Grid container={true} direction='row' justify='center' alignItems='center'>
                <Grid item xs={6}>
                    <LogoWithName />
                </Grid>
            </Grid>
            <Grid container={true} direction='row' justify='center' alignItems='center'>
                <Grid item xs={6}>
                    <Typography>{'Sorry, Clarissa is not meant to be used on mobile. Please open the application in a desktop browser or download our mobile app from Google Play/the App Store.'}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

const getMobile = () => window.matchMedia('only screen and (max-width: 959px)').matches;

const MobileBlock = (props) => {
    const [mobile, setMobile] = useState(getMobile());
    const resizeListener = () => {
        setMobile(getMobile());
    };
    useEffect(() => {
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    if (!mobile) {
        return props.children;
    } else {
        console.log('Get the mobile app!');
        return <BlockPage />;
    }
};
MobileBlock.propTypes = {
    children: PropTypes.node.isRequired,
};
export default MobileBlock;

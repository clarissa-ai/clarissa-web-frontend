import React from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import {Button, makeStyles, Typography} from '@material-ui/core';
import propTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#F46D66',
        color: '#FFFF',
        marginLeft: '10px',
    },
    labelButton: {
        textTransform: 'none',
        justifyContent: 'start',
    },
}));

const EndIllnessButton = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    EndIllnessButton.propTypes = {
        incrstate: propTypes.func,
    };

    const profile = useSelector(profileSelector);

    const handleClick = () => {
        if (!profile.authenticated) return;
        fetch(`${apiLink}/api/illness/close_active_illness`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json()).then(() => {
            props.incrstate();
        });
    };

    return (
        <Button classes={{root: classes.button, label: classes.labelButton}} onClick={handleClick} variant="contained" startIcon={<CloseIcon/>}>
            <Typography variant='subtitle2'>End Illness</Typography>
        </Button>
    );
};
export default EndIllnessButton;

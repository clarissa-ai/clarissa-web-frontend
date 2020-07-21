import React from 'react';
import {Link, Button, makeStyles, Typography} from '@material-ui/core';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
/* import {Link} from 'react-router-dom'; */


const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#306DDF',
        color: '#FFFF',
    },
    labelButton: {
        textTransform: 'none',
        justifyContent: 'start',
    },
}));

const ExportIllnessButton = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    return (
        <Link target="_blank" href={apiLink + '/api/illness/export_active_illness/illness.pdf'} underline='none' download>
            <Button classes={{root: classes.button, label: classes.labelButton}}>
                <FilterNoneOutlinedIcon/>
                <Typography variant='subtitle2' style={{marginLeft: '30px'}}>Export Illness</Typography>
            </Button>
        </Link>
    );
};
export default ExportIllnessButton;

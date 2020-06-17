import React from 'react';
import {Box, Card, Typography, Grid, CardContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    symptomCard: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '23em',
    },
};

class SymptomCard extends React.Component {
    constructor(props) {
        super(props);
        SymptomCard.propTypes = {
            symptom: PropTypes.string.isRequired,
            severity: PropTypes.string.isRequired,
            month: PropTypes.string.isRequired,
            day: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
            data: PropTypes.string.isRequired,
        };
    }
    render() {
        const {classes} = this.props;
        return <Card className={classes.symptomCard}>
            <CardContent>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={1.5}><Typography color='textSecondary'><Box fontWeight="fontWeightBold">{this.props.symptom}Fever</Box></Typography></Grid>
                    <Grid item xs={9}><Typography color='error'><Box fontWeight="fontWeightBold">{this.props.severity}102.8F</Box></Typography></Grid>
                    <Grid item xs={1}><Typography color='textPrimary'><Box fontWeight={500}>{this.props.severity}Edit</Box></Typography></Grid>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item><Typography>Date Logged: </Typography></Grid>
                    <Grid item><Typography color='textSecondary'>{this.props.month} {this.props.day} {this.props.year} December 23, 2018</Typography></Grid>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item><Typography color='textPrimary' className={classes.heading}>Data: {this.props.data} </Typography></Grid>
                    <Grid item><Typography color='textSecondary'>102.8F</Typography></Grid>
                </Grid>
            </CardContent>
        </Card>;
    }
}

export default withStyles(styles)(SymptomCard);

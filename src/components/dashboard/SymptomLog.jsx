import React from 'react';
import {Button, TextField, Box, Card, Typography, Grid, CardContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const styles = {
    container: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '40em',
    },
    textInput: {
        margin: '1em 0',
    
    },
    submitBtn: {
        backgroundColor: '#47C594',
        color: '#fff',
        textTransform: "none",
    },
};

class SymptomLog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return <div>
            <Card className={classes.container}>
                <CardContent>
                    <Typography color='textSecondary'><Box fontWeight="fontWeightBold" marginTop={1} marginBottom={1}>Tell Clarissa how you are feeling.</Box></Typography>
                    <InputBase
                        className={classes.input}
                        placeholder="I have a fever, and a cough. I have also been feeling nauseous lately."
                        fullWidth
                        style={{margin: '0.5em 0'}}
                    />
                    <Grid container spacing={4}>
                        <Grid item xs={10}><Typography color='textSecondary' variant="subtitle2">Symptoms Recognized:</Typography></Grid>
                        <Grid item><Button size='small' className={classes.submitBtn}>Submit</Button></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>;
    }
}
export default withStyles(styles)(SymptomLog);

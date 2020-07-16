import React, {useState} from 'react';
import clsx from 'clsx';
import {Button, Card, CircularProgress, Grid, CardContent, makeStyles, Divider, Typography, Checkbox} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        height: '100%',
        backgroundColor: '#FFF',
    },
    textInput: {
        color: '#AEAEAE',
    },
    submitBtn: {
        backgroundColor: '#47C594',
        color: '#fff',
        textTransform: 'none',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
        margin: 0,
        paddingBottom: '0',
    },
    labelButton: {
        textTransform: 'none',
        justifyContent: 'start',
    },
    rootButton: {
        height: '2.5rem',
        textAlign: 'left',
        paddingLeft: '0',
        borderRadius: 6,
        borderWidth: 1.25,
        backgroundColor: '#EDF2FF',
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        'borderRadius': 3,
        'width': 14,
        'height': 14,
        'borderStyle': 'solid',
        'borderColor': 'rgba(0, 0, 0, 0.2)',
        'borderWidth': '1px',
        'boxShadow': 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        'backgroundColor': '#f5f8fa',
        'backgroundImage': 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        'backgroundColor': '#47C594',
        'backgroundImage': 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 14,
            height: 14,
            backgroundImage:
            'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath' +
            ' fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 ' +
            '1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z\' fill=\'%23fff\'/%3E%3C/svg%3E")',
            content: '""',
        },
    },
}));

const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

const SymptomLog = (props) => {
    const classes = useStyles();

    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [illness, setIllness] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    const handleChange = (event) => {
        setText(event.target.value);
        const result = {
            'text': event.target.value,
        };
        fetch(`${apiLink}/api/illness/check_symptoms`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json())
            .then(
                (result) => {
                    if (result.symptoms_json.mentions === undefined) {
                        updateSelected(0 - illness.length,
                            result.symptoms_json.mentions, illness);
                        setIllness([]);
                    } else {
                        updateSelected(result.symptoms_json.mentions.length - illness.length,
                            result.symptoms_json.mentions, illness);
                        setIllness(result.symptoms_json.mentions);
                    }
                },
                (error) => {
                    setError(error);
                },
            );
    };

    const updateSelected = (change, newIllness, oldIllness) => {
        let i = 0;
        const select = [...selected];
        let newLength = 0;
        if (newIllness) {
            newLength = newIllness.length;
        }
        if (change > 0) {
            while (change > 0 && i < newLength) {
                if (i > oldIllness.length - 1) {
                    select.push(true);
                    change--;
                } else {
                    if (newIllness[i].name !== oldIllness[i].name) {
                        select.splice(i, 0, true);
                        change--;
                    }
                }
                i++;
            }
        } else if (change < 0) {
            while (change < 0 && i < oldIllness.length) {
                if (i > newLength - 1) {
                    select.pop();
                    change++;
                } else {
                    if (newIllness[i].name !== oldIllness[i].name) {
                        select.splice(i, 1);
                        change++;
                    }
                }
                i++;
            }
        } else {
            while (i < newLength) {
                if (newIllness[i].name !== oldIllness[i].name) {
                    select[i] = true;
                }
                i++;
            }
        }
        setSelected(select);
        console.log(select);
    };

    const onButtonClick = (index) => {
        const select = [...selected];
        select[index] = !selected[index];
        setSelected(select);
    };

    const onSubmit = () => {
        if (isLoaded) {
            setIsLoaded(false);
        }
        let i = 0;
        const symptoms = [];
        while (i < illness.length) {
            if (selected[i]) {
                symptoms.push(illness[i]);
            }
            i++;
        }
        console.log(symptoms);
        fetch(`${apiLink}/api/illness/save_symptoms`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({symptoms}),
        }).then((res) => {
            res.json();
        }).then(() => {
            props.incrState();
            setIsLoaded(true);
        });
        setIllness([]);
        setSelected([]);
        setText('');
    };

    const displayIllnessName = (name) => {
        /* const commaPos = name.indexOf(',');
        if (commaPos > 0) {
            const type = name.substring(0, commaPos);
            let severity = name.substring(commaPos + 1);
            severity = severity.charAt(1).toUpperCase() + severity.slice(2);
            return (
                <Grid container>
                    <Typography variant='subtitle2' style={{marginRight: '25px'}}>{type}</Typography>
                    <Typography variant='subtitle2'>{severity}</Typography>
                </Grid>
            );
        }*/
        return (<Typography variant='subtitle2'>{name}</Typography>);
    };

    if (error) {
        return <div>{error.message}</div>;
    } else {
        return (
            <Card className={classes.container}>
                <CardContent className={classes.content}>
                    {/* Symptom Input */}
                    <InputBase
                        className={classes.textInput}
                        multiline
                        rows={2}
                        placeholder="I have a fever, and a cough. I have also been feeling nauseous lately."
                        fullWidth
                        margin='none'
                        value={text}
                        onChange={handleChange}
                    />
                    <Divider/>
                    <Grid><Typography style={{paddingTop: '10px'}}>Symptoms Recognized:</Typography></Grid>
                    <Grid container spacing={2}>
                        { illness.map((illness, index) => {
                            return (
                                <Grid item key={index}>
                                    <Button classes={{root: classes.rootButton, label: classes.labelButton}} onClick={() => onButtonClick(index)}>
                                        <Checkbox
                                            checked={selected[index]}
                                            className={classes.root}
                                            disableRipple
                                            color="default"
                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                            icon={<span className={classes.icon} />}
                                            inputProps={{'aria-label': 'decorative checkbox'}}
                                            {...props}
                                        />
                                        {displayIllnessName(illness.common_name)}
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid container justify='flex-end' style={{paddingTop: '10px'}}>
                        {!isLoaded && <CircularProgress style={{color: '#47C594', margin: '5px'}} size={24}/>}
                        <Grid item>
                            <Button size='small' className={classes.submitBtn} onClick={onSubmit}>Save</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
};
export default SymptomLog;

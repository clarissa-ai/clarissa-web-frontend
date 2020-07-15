import React, {useState} from 'react';
import clsx from 'clsx';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography, Grid, makeStyles, Button, Checkbox, Container} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ReactComponent as NextIconDisable} from './icons/DisableNext.svg';
import {ReactComponent as PrevIconDisable} from './icons/DisablePrev.svg';
import {ReactComponent as NextIconActive} from './icons/ActiveNext.svg';
import {ReactComponent as PrevIconActive} from './icons/ActivePrev.svg';
// import data from './COV-19.json';
import ScreeningResult from './ScreeningResult';

const useStyles = makeStyles((theme) => ({
    start: {
        paddingTop: '13rem',
        paddingBottom: '2rem',
    },
    rootButton: {
        width: '17.75rem',
        minHeight: '5.75rem',
        textAlign: 'left',
        paddingLeft: '0',
        borderRadius: 6,
        borderWidth: 1.25,
    },
    rootPrev: {
        height: '4rem',
    },
    rootNext: {
        height: '4rem',
        float: 'right',
    },
    labelButton: {
        textTransform: 'none',
        justifyContent: 'start',
    },
    space: {
        padding: '1rem',
    },
    formControl: {
        width: 400,
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    circleIcon: {
        'borderRadius': 20,
        'width': 20,
        'height': 20,
        'borderStyle': 'solid',
        'borderColor': 'rgba(0, 0, 0, 0.2)',
        'borderWidth': '1px',
        'backgroundColor': '#ffff',
        'backgroundImage':
            'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '1px auto rgba(19,124,189,.6)',
            outlineOffset: 1,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    circleNoneIcon: {
        'borderRadius': 20,
        'width': 20,
        'height': 20,
        'borderStyle': 'solid',
        'borderColor': '#FF6496',
        'borderWidth': '1px',
        'backgroundColor': '#ffff',
        'backgroundImage':
            'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '1px auto rgba(19,124,189,.6)',
            outlineOffset: 1,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        'backgroundColor': 'rgba(255, 255, 255, 0.4)',
        'backgroundImage':
          'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage:
            'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath' +
            ' fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 ' +
            '1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z\' fill=\'%23fff\'/%3E%3C/svg%3E")',
            content: '""',
        },
    },
}));

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#306DDF',
            contrastText: '#ffff',
        },
        secondary: {
            main: '#FF6496',
            contrastText: '#ffff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.3)',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});
theme = responsiveFontSizes(theme);

const ScreeningQuestions = (props) => {
    const classes = useStyles();
    const data = props.data;
    const idNum = props.idNum;
    const email = props.email;
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    // Gets question index
    const processQuestion = (qNum) => {
        let qIndex = 0;
        let i = 0;
        while (i < data.question_count) {
            if (qNum === data.questions[i].id) {
                qIndex = i;
            }
            i++;
        }
        return qIndex;
    };
    // Gets summary index
    const processSummary = (sNum) => {
        let sIndex = 0;
        let i = 0;
        while (i < data.summaries.length) {
            if (sNum === data.summaries[i].id) {
                sIndex = i;
            }
            i++;
        }
        return sIndex;
    };

    // Question index
    const [questionIndex, setQIndex] = useState(processQuestion(data.root_id));
    // Array of nexts for each question
    const [nextQuestion, setNextQuestion] = useState(new Array(data.question_count).fill(''));
    // Question Order
    const [questOrder, setQuestOrder] = useState([data.root_id]);
    // Choices selected for each question in 2D array
    const [choice, setChoice] = useState(new Array(data.question_count).fill([]));
    // Number of choices selected
    const [checked, setChecked] = useState(new Array(data.questions[questionIndex].options.length).fill(false));
    // State for Drop down selected value
    const [dropDownValue, setDropDownValue] = useState({title: 'Please Select'});
    // Changes page to result page
    const [showResult, setShowResult] = useState(false);
    // Keeps track of summary weights for each summary
    const [sumWeight, setSumWeight] = useState(new Array(data.summaries.length).fill(0));
    // Holds the index of the summary to be used for the result page
    const [summIdx, setSummIdx] = useState(null);

    // Handles click for choice answers
    const handleButtonClick = (index, next, summId, sWeight) => {
        const nxt = [...nextQuestion];
        if (next === undefined) {
            next = data.questions[questionIndex].default_next;
        }
        nxt[questionIndex] = next;
        setNextQuestion(nxt);
        const check = [...checked];
        const choices = [...choice];
        let checkSumm = false;
        let weights;
        let sIdx;
        if (summId !== undefined && sWeight !== undefined) {
            weights = sumWeight;
            sIdx = processSummary(summId);
            checkSumm = true;
        }
        if (data.questions[questionIndex].type === 'single_select') {
            if (checked[index]) {
                check[index] = false;
                if (checkSumm) {
                    weights[sIdx] -= sWeight;
                    setSumWeight(weights);
                }
            } else {
                const oldIndex = check.indexOf(true);
                if (oldIndex !== -1) {
                    if (data.questions[questionIndex].options[oldIndex].summary_id !== undefined &&
                        data.questions[questionIndex].options[oldIndex].summary_weight !== undefined) {
                        const oldWeightIndex = processSummary(data.questions[questionIndex].options[oldIndex].summary_id);
                        weights[oldWeightIndex] -= data.questions[questionIndex].options[oldIndex].summary_weight;
                    }
                    check[oldIndex] = false;
                }
                check[index] = true;
                if (checkSumm) {
                    weights[sIdx] += sWeight;
                    setSumWeight(weights);
                }
            }
        } else {
            if (checked[index]) {
                check[index] = false;
                if (checkSumm) {
                    weights[sIdx] -= sWeight;
                    setSumWeight(weights);
                }
            } else {
                if (data.questions[questionIndex].options[index].title === 'None' ||
                    data.questions[questionIndex].options[index].title === 'None of the above') {
                    let i = 0;
                    while (i < data.questions[questionIndex].options.length) {
                        if (check[i] === true) {
                            check[i] = false;
                            if (data.questions[questionIndex].options[i].summary_id !== undefined &&
                                data.questions[questionIndex].options[i].summary_weight !== undefined) {
                                const ids = processSummary(data.questions[questionIndex].options[i].summary_id);
                                weights[ids] -= data.questions[questionIndex].options[i].summary_weight;
                            }
                        }
                        i++;
                    }
                    check[index] = true;
                    if (checkSumm) {
                        weights[sIdx] += sWeight;
                    }
                } else {
                    if (check[check.length-1] === true) {
                        check[check.length-1] = false;
                        if (data.questions[questionIndex].options[check.length-1].summary_id !== undefined &&
                            data.questions[questionIndex].options[check.length-1].summary_weight !== undefined) {
                            const noneID = processSummary(data.questions[questionIndex].options[check.length-1].summary_id);
                            weights[noneID] -= data.questions[questionIndex].options[check.length-1].summary_weight;
                        }
                    }
                    check[index] = true;
                    if (checkSumm) {
                        weights[sIdx] += sWeight;
                        setSumWeight(weights);
                    }
                }
            }
        }
        choices[questionIndex] = check;
        setChecked(check);
        setChoice(choices);
    };

    // Handles Next button
    const handleNext = () => {
        if (nextQuestion[questionIndex] === -1) {
            setShowResult(true);
            const maxWeight = Math.max(...sumWeight);
            const summaryIndex = sumWeight.indexOf(maxWeight);
            setSummIdx(summaryIndex);

            // Creates and pushes JSON to endpoint
            const resQ = [];
            let i = 0;
            let j;
            while (i < data.question_count) {
                const index = questOrder.indexOf(data.questions[i].id);
                const id = `${data.questions[i].id}`;
                const answers = [];
                if (index !== -1) {
                    j = 0;
                    const optionLength = data.questions[i].options.length;
                    while (j < optionLength) {
                        if (choice[i][j] === true) {
                            answers.push(`${data.questions[i].options[j].title}`);
                        }
                        j++;
                    }
                }
                resQ[i] = {
                    'id': id,
                    'choices': answers,
                };
                i++;
            }

            const resSumm = {};
            i = 0;
            let currID;
            while (i < data.summaries.length) {
                currID = `${data.summaries[i].id}`;
                resSumm[currID] = sumWeight[i];
                i++;
            }

            let result;
            if (!email) {
                result = {
                    'survey_id': idNum,
                    'json_body': {
                        'questions': resQ,
                        'summary': {
                            'id': data.summaries[summaryIndex].id,
                            'weight': maxWeight,
                        },
                        'final_weights': resSumm,
                    },
                };
            } else {
                result = {
                    'survey_id': idNum,
                    'user_email': email,
                    'json_body': {
                        'questions': resQ,
                        'summary': {
                            'id': data.summaries[summaryIndex].id,
                            'weight': maxWeight,
                        },
                        'final_weights': resSumm,
                    },
                };
            }
            fetch(`${apiLink}/api/survey/submit_response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            }).then((res) => res.json());
        } else {
            const order = [...questOrder];
            const choices = [...choice];
            const nextQuestionNum = processQuestion(nextQuestion[questionIndex]);
            order.push(nextQuestion[questionIndex]);
            choices[questionIndex] = [...checked];
            setQIndex(processQuestion(nextQuestion[questionIndex]));
            setQuestOrder(order);
            setChoice(choices);
            if (choices[nextQuestionNum].length !== 0) {
                setChecked(choices[nextQuestionNum]);
                if (data.questions[questionIndex].type === 'dropdown') {
                    const index = choices[nextQuestionNum].indexOf(true);
                    setDropDownValue(data.questions[nextQuestionNum].options[index].title);
                }
            } else setChecked(new Array(data.questions[nextQuestionNum].options.length).fill(false));
        }
    };

    // Handles Prev button
    const handlePrev = () => {
        const order = [...questOrder];
        const choices = [...choice];
        order.pop();
        const prevQuestionIndex = processQuestion(order[order.length-1]);
        setQuestOrder(order);
        setQIndex(prevQuestionIndex);
        setChecked(choices[prevQuestionIndex]);
        if (data.questions[prevQuestionIndex].type === 'dropdown') {
            const index = choices[prevQuestionIndex].indexOf(true);
            setDropDownValue(data.questions[prevQuestionIndex].options[index].title);
        }
    };

    // Handles choosing options from a drop down
    const handleChooseDrop = (event, child) => {
        setDropDownValue(event.target.value);
        const index = child.key;
        let next = child.props.next;
        const nxt = [...nextQuestion];
        if (next === undefined) {
            next = data.questions[questionIndex].default_next;
        }
        nxt[questionIndex] = next;
        setNextQuestion(nxt);
        const check = [...checked];
        const choices = [...choice];
        let checkSumm = false;
        let weights;
        let sIdx;
        if (child.props.summaryID !== undefined &&
            child.props.weight !== undefined) {
            weights = sumWeight;
            sIdx = processSummary(child.props.summaryID);
            checkSumm = true;
        }
        const oldIndex = check.indexOf(true);
        if (oldIndex !== -1) {
            if (data.questions[questionIndex].options[oldIndex].summary_id !== undefined &&
                data.questions[questionIndex].options[oldIndex].summary_weight !== undefined) {
                const oldWeightIndex = processSummary(data.questions[questionIndex].options[oldIndex].summary_id);
                weights[oldWeightIndex] -= data.questions[questionIndex].options[oldIndex].summary_weight;
            }
            check[oldIndex] = false;
        }
        check[index] = true;
        if (checkSumm) {
            weights[sIdx] += child.props.weight;
            setSumWeight(weights);
        }
        choices[questionIndex] = check;
        setChecked(check);
        setChoice(choices);
    };

    // Activate/De-activate next button
    const activateNext = () => {
        if (checked.indexOf(true) > -1) {
            return false;
        } else {
            return true;
        }
    };

    // Activate/De-activate previous button
    const activatePrev = () => {
        if (questOrder.length === 1) {
            return true;
        } else return false;
    };

    // Styling change for clicked choices
    const variantClicked = (index) => {
        if (checked[index]) {
            return 'contained';
        } else return 'outlined';
    };

    // Styling change for disabled and enabled next icon
    const changeNextIcon = () => {
        if (checked.indexOf(true) > -1) {
            return <NextIconActive/>;
        } else {
            return <NextIconDisable/>;
        }
    };

    // Styling change for choice color
    const changeButtonColor = (index) => {
        if (checked[index] && (data.questions[questionIndex].options[index].title === 'None' ||
            data.questions[questionIndex].options[index].title === 'None of the above')) {
            return 'secondary';
        } else if (!checked[index] && (data.questions[questionIndex].options[index].title === 'None' ||
                    data.questions[questionIndex].options[index].title === 'None of the above')) {
            return 'secondary';
        } else if (checked[index]) {
            return 'primary';
        } else return 'default';
    };

    // Styling change for disabled and enabled prev icon
    const changePrevIcon = () => {
        if (questOrder.length === 1) {
            return <PrevIconDisable/>;
        } else return <PrevIconActive/>;
    };

    // Styling change for none
    const changeNone = (index) => {
        if (data.questions[questionIndex].options[index].title === 'None' ||
            data.questions[questionIndex].options[index].title === 'None of the above') {
            return <span className={classes.circleNoneIcon} />;
        } else return <span className={classes.circleIcon} />;
    };

    // Displays choices for choice questions
    const displayChoices =
    (data.questions[questionIndex].options).map((data, index) => {
        return (
            <Grid item key={index}>
                <Button
                    color={changeButtonColor(index)} disableRipple
                    variant={variantClicked(index)}
                    onClick={() => handleButtonClick(index, data.next_id, data.summary_id, data.summary_weight)}
                    classes={{root: classes.rootButton, label: classes.labelButton}}
                >
                    <Checkbox
                        className={classes.root}
                        checked={checked[index]}
                        disableRipple
                        color="default"
                        checkedIcon={<span className={clsx(classes.circleIcon, classes.checkedIcon)} />}
                        icon={changeNone(index)}
                        inputProps={{'aria-label': 'decorative checkbox'}}
                    />
                    <Typography>{data.title}</Typography>
                </Button>
            </Grid>
        );
    });

    // Display choices itself for dropdown
    const displayDropDownChoices =
    (data.questions[questionIndex].options).map((data, index) => {
        return (
            <MenuItem key={index} value={data.title}
                next={data.next_id} summaryID={data.summary_id}
                weight={data.summary_weight}>
                {data.title}
            </MenuItem>
        );
    });

    // Wraps choices in Dropdown menu
    const displayDropDown = (
        <Grid container justify='center' style={{paddingTop: '1.75em'}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Please Select</InputLabel>
                <Select labelId="demo-simple-select-label"
                    value={dropDownValue} onChange={handleChooseDrop}
                >
                    {displayDropDownChoices}
                </Select>
            </FormControl>
        </Grid>
    );

    // Chooses which type to pick based on question
    const chooseType = () => {
        if (data.questions[questionIndex].type === 'dropdown') {
            return displayDropDown;
        } else return displayChoices;
    };

    if (showResult) {
        return <ScreeningResult idx={summIdx} data={data}/>;
    } else {
        return (
            <Container>
                <Grid container justify="center"
                    className={classes.start} spacing={10}
                >
                    <Grid item xs={6}>
                        <Grid style={{paddingLeft: '.65em'}}>
                            <Typography variant="subtitle1" paragraph>
                                {'Question '+(questOrder.length)+'/'+data.question_count}
                            </Typography>
                            <Typography variant="h4" paragraph>
                                {data.questions[questionIndex].title}
                            </Typography>
                            <Typography component='div'>
                                {data.questions[questionIndex].description}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Button disabled={activatePrev()} size='large'
                                classes={{root: classes.rootPrev, label: classes.labelButton}}
                                onClick={() => handlePrev()} color='primary'
                            >
                                {changePrevIcon()}
                                <Typography variant='h5' className={classes.space}>Prev</Typography>
                            </Button>
                            <Button disabled={activateNext()} size='large'
                                classes={{root: classes.rootNext, label: classes.labelButton}}
                                onClick={() => handleNext()} color='primary'
                            >
                                <Typography variant='h5' className={classes.space}>Next</Typography>
                                {changeNextIcon()}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={1}>
                                {chooseType()}
                            </Grid>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};
export default ScreeningQuestions;

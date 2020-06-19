import React from 'react';
import PropTypes from 'prop-types';
import {Chart, Doughnut} from 'react-chartjs-2';
import {useTheme} from '@material-ui/core';

const IllnessChart = (props) => {
    const theme = useTheme();

    const dataNum = [60, 15, 25];
    const max = Math.max(...dataNum);
    const indexMax = dataNum.indexOf(max);
    const colors = [
        theme.palette.success.main,
        theme.palette.error.main,
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.secondary.main,
    ];


    IllnessChart.propTypes = {
        className: PropTypes.string,
    };

    const data = {
        datasets: [
            {
                data: dataNum,
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
        labels: ['Common Cold', 'Strep', 'Pnumonia'],
        text: `${max}%`,
    };

    const options = {
        legend: {
            display: false,
        },
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            animateRotate: true,
        },
        cutoutPercentage: 90,
        layout: {padding: 0},
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
        },
    };

    const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
        draw: function() {
            originalDoughnutDraw.apply(this);

            const chart = this.chart.chart;
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;

            const fontSize = (height / 100);
            ctx.font = fontSize + 'em Verdana';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = colors[indexMax];

            const text = chart.config.data.text;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillText(text, textX, textY);
        },
    });

    return (
        <div className={props.className} >
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default IllnessChart;

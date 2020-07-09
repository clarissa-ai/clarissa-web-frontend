import React from 'react';
import PropTypes from 'prop-types';
import {Chart, Doughnut} from 'react-chartjs-2';
import {useTheme} from '@material-ui/core';

const IllnessChart = (props) => {
    const theme = useTheme();

    const dataNum = props.dataNum;
    const diseases = props.diseases;
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
        dataNum: PropTypes.array,
        diseases: PropTypes.array,
    };

    const data = {
        datasets: [
            {
                data: dataNum,
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
        labels: diseases,
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
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
    };

    const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
        draw: function(ease) {
            originalDoughnutDraw.apply(this);

            const chart = this.chart.chart;
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;

            const fontSize = (height / 80);
            ctx.font = fontSize + 'em Poppins';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = colors[indexMax];

            const text = chart.config.data.text;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillText(text, textX, textY);

            const easingDecimal = ease || 1;
            const arcs = this.getMeta().data;
            Chart.helpers.each(arcs, function(arc, i) {
                arc.transition(easingDecimal).draw();

                const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
                const pColor = pArc._view.backgroundColor;

                const vm = arc._view;
                const radius = (vm.outerRadius + vm.innerRadius) / 2;
                const thickness = (vm.outerRadius - vm.innerRadius) / 2;
                const startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                const angle = Math.PI - vm.endAngle - Math.PI / 2;

                ctx.save();
                ctx.translate(vm.x, vm.y);

                ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                ctx.beginPath();
                ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = vm.backgroundColor;
                ctx.beginPath();
                ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                ctx.fill();

                ctx.restore();
            });
        },
    });

    return (
        <div className={props.className} >
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default IllnessChart;

/* eslint-disable react/prop-types */
import Chart from 'react-apexcharts';

const DonutChart = ({
    data,
    dispatchUpdateTableDataType,
}) => (
    <div>
        <Chart
            options={{
                chart: {
                    type: 'donut',
                    fontFamily: 'Avenir, Courier, monospace',
                    events: {
                        dataPointSelection(chartContext, seriesIndex, config) {
                            window.scrollTo(0, document.body.scrollHeight / 4);

                            dispatchUpdateTableDataType({
                                type: 'course',
                                value: config.w.config.labels[config.dataPointIndex],
                            });
                        },
                    },
                },
                width: '40%',
                // responsive: [{
                //     breakpoint: 480,
                //     options: {
                //         chart: {
                //             width: 200,
                //         },
                //         legend: {
                //             position: 'bottom',
                //         },
                //     },
                // }],
                labels: data.map((item) => item.course),
                legend: {
                    position: 'bottom',
                    formatter(seriesName) {
                        return seriesName;
                    },
                },
            }}
            series={data.map((item) => item.count)}
            type="donut"
            width="500"
        />
    </div>
);

export default DonutChart;

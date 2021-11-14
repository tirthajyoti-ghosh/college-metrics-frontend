/* eslint-disable react/prop-types */
import Chart from 'react-apexcharts';
import config from '../config';

const DonutChart = ({
    data,
    dispatchUpdateTableDataType,
}) => (
    <div>
        <Chart
            options={{
                width: '40%',
                responsive: config.DONUT_CHART_RESPONSIVE_CONFIGS,
                labels: data.map((item) => item.course),
                legend: {
                    position: 'bottom',
                    formatter(seriesName) {
                        return seriesName;
                    },
                },
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
            }}
            series={data.map((item) => item.count)}
            type="donut"
            width="500"
        />
    </div>
);

export default DonutChart;

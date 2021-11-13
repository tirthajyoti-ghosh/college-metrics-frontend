/* eslint-disable react/prop-types */
import Chart from 'react-apexcharts';

const LineChart = ({ data }) => (
    <div>
        <Chart
            options={{
                chart: {
                    type: 'donut',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                }],
                labels: data.map((item) => item.course),
                legend: {
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

export default LineChart;

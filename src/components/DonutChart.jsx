import Chart from 'react-apexcharts';

const LineChart = () => {
    const data = [
        {
            course: 'Electrical Engineering',
            count: 75,
        },
        {
            course: 'Applied Physics',
            count: 71,
        },
        {
            course: 'English',
            count: 68,
        },
        {
            course: 'Computer Science',
            count: 65,
        },
        {
            course: 'Virology',
            count: 73,
        },
        {
            course: 'Neuroscience',
            count: 75,
        },
        {
            course: 'Music',
            count: 68,
        },
    ];

    return (
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
};

export default LineChart;

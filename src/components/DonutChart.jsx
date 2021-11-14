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
                responsive: [
                    {
                        breakpoint: 1700,
                        options: {
                            legend: {
                                width: 370,
                                horizontalAlign: 'center',
                            },
                            chart: {
                                width: 450,
                            },
                        },
                    },
                    {
                        breakpoint: 1600,
                        options: {
                            chart: {
                                width: 400,
                            },
                            legend: {
                                horizontalAlign: 'center',
                            },
                        },
                    },
                    {
                        breakpoint: 1500,
                        options: {
                            width: 400,
                            legend: {
                                width: 320,
                                horizontalAlign: 'center',
                            },
                        },
                    },
                    {
                        breakpoint: 1400,
                        options: {
                            chart: {
                                width: 350,
                            },
                            legend: {
                                width: 300,
                                horizontalAlign: 'center',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '55%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 1350,
                        options: {
                            width: '100%',
                            chart: {
                                width: '100%',
                                height: '400px',
                            },
                            legend: {
                                width: 600,
                                horizontalAlign: 'center',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '65%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 1300,
                        options: {
                            chart: {
                                height: '350px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                            },
                        },
                    },
                    {
                        breakpoint: 1200,
                        options: {
                            legend: {
                                width: 400,
                                horizontalAlign: 'center',
                            },
                        },
                    },
                    {
                        breakpoint: 1150,
                        options: {
                            chart: {
                                height: '300px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '55%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 1100,
                        options: {
                            chart: {
                                height: '350px',
                            },
                            legend: {
                                width: 280,
                                horizontalAlign: 'center',
                            },
                        },
                    },
                    {
                        breakpoint: 990,
                        options: {
                            chart: {
                                height: '340px',
                            },
                            legend: {
                                horizontalAlign: 'left',
                            },
                        },
                    },
                    {
                        breakpoint: 876,
                        options: {
                            chart: {
                                height: '400px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                                width: 350,
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '65%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 768,
                        options: {
                            chart: {
                                height: '340px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '55%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 576,
                        options: {
                            chart: {
                                height: '300px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '50%',
                                    },
                                },
                            },
                        },
                    },
                    {
                        breakpoint: 450,
                        options: {
                            chart: {
                                height: '280px',
                            },
                            legend: {
                                horizontalAlign: 'center',
                                width: 250,
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '45%',
                                    },
                                },
                            },
                        },
                    },
                ],
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

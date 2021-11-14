/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

import MapChart from '../components/MapChart';
import DonutChart from '../components/DonutChart';
import { PieChartSkeleton, BarChartSkeleton } from '../components/SkeletonLoaders';

import { updateTableDataType } from '../store/actions';

import config from '../config';

const Charts = ({
    dispatchUpdateTableDataType,
}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState('');

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${config.API_BASE_URL}/colleges/stats`);
            setData(response.data);
            setLoading(false);
        }

        getData();
    }, []);
    return (
        <section className="charts">
            {loading
                ? (
                    <div className="loader">
                        <BarChartSkeleton />
                        <PieChartSkeleton />
                    </div>
                ) : (
                    <>
                        <div className="map">
                            <MapChart
                                data={data.countryStats}
                                setTooltipContent={setContent}
                                dispatchUpdateTableDataType={dispatchUpdateTableDataType}
                            />
                            <ReactTooltip>{content}</ReactTooltip>
                        </div>

                        <DonutChart
                            data={data.courseStats}
                            dispatchUpdateTableDataType={dispatchUpdateTableDataType}
                        />
                    </>
                )}
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateTableDataType: (value) => dispatch(updateTableDataType(value)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Charts);

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

import MapChart from '../components/MapChart';
import DonutChart from '../components/DonutChart';

import { updateTableDataType } from '../store/actions';

const Charts = ({
    dispatchUpdateTableDataType,
}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState('');

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/stats`);
            setData(response.data);
            setLoading(false);
        }

        getData();
    }, []);
    return (
        <section className="charts">
            {loading ? <h1>Loading...</h1> : (
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

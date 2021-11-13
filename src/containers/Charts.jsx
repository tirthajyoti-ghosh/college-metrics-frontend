import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

import MapChart from '../components/MapChart';
import DonutChart from '../components/DonutChart';

const Charts = () => {
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
    return loading ? <h1>Loading...</h1> : (
        <div className="section charts">
            <MapChart data={data.countryStats} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>

            <DonutChart data={data.courseStats} />
        </div>
    );
};

export default Charts;

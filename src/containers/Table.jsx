import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TableComponent from '../components/Table';

// eslint-disable-next-line react/prop-types
const Table = ({ type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/list`);

            setData(response.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    return loading ? <h1>Loading...</h1> : (
        <div className="section table">
            <TableComponent type={type} data={data} />
        </div>
    );
};

export default Table;

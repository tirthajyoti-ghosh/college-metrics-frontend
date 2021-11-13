/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TableComponent from '../components/Table';

import {
    updateOpenDetailsSectionState,
    updateSelectedCollegeId,
} from '../store/actions';

const Table = ({
    type,
    dispatchUpdateOpenDetailsSectionState,
    dispatchUpdateSelectedCollegeId,
}) => {
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
        <section className="section table">
            <TableComponent
                type={type}
                data={data}
                dispatchUpdateOpenDetailsSectionState={dispatchUpdateOpenDetailsSectionState}
                dispatchUpdateSelectedCollegeId={dispatchUpdateSelectedCollegeId}
            />
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateOpenDetailsSectionState: (value) => (
        dispatch(updateOpenDetailsSectionState(value))
    ),
    dispatchUpdateSelectedCollegeId: (value) => dispatch(updateSelectedCollegeId(value)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Table);

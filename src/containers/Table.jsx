/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TableComponent from '../components/Table';

import { updateSelectedCollegeId } from '../store/actions';

const Table = ({
    type,
    scrollY,
    tableDataType,
    dispatchUpdateSelectedCollegeId,
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/list`);

            // eslint-disable-next-line max-len
            const randomCollegeId = response.data[Math.floor(Math.random() * response.data.length)].id;
            dispatchUpdateSelectedCollegeId(randomCollegeId);

            setData(response.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const { type, value } = tableDataType;
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/list?type=${type}&value=${value}`);

            setData(response.data);
            setLoading(false);
        }

        if (tableDataType !== null) {
            fetchData();
        }
    }, [tableDataType]);

    let heading = 'All colleges';
    if (tableDataType !== null) {
        if (tableDataType.type === 'country') {
            heading = `Colleges in ${tableDataType.value}`;
        } else {
            heading = `Colleges offering ${tableDataType.value}`;
        }
    }

    return (
        <section className="section table">
            {loading ? <h1>Loading...</h1> : (
                <>
                    <h2>
                        {heading}
                    </h2>

                    <TableComponent
                        type={type}
                        data={data}
                        scrollY={scrollY}
                        dispatchUpdateSelectedCollegeId={dispatchUpdateSelectedCollegeId}
                    />
                </>
            )}
        </section>
    );
};

const mapStateToProps = (state) => ({
    tableDataType: state.tableDataType,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateSelectedCollegeId: (value) => dispatch(updateSelectedCollegeId(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);

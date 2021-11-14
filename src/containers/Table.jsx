/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TableComponent from '../components/Table';
import { DataTableSkeleton } from '../components/SkeletonLoaders';

import { updateSelectedCollegeId, updateDetailsSectionVisible } from '../store/actions';

import config from '../config';

const Table = ({
    type, // which table to display - "college" or "student"
    scrollY, // height of the table, different for college and student
    tableDataType, // in "colleges" table, this is the data type to display - by "country" or "course"
    dispatchUpdateSelectedCollegeId,
    dispatchUpdateDetailsSectionVisible,
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // This runs on mount i.e., when the page loads
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${config.API_BASE_URL}/colleges/list`);

            if (window.innerWidth > 1100) {
                // eslint-disable-next-line max-len
                const randomCollegeId = response.data[Math.floor(Math.random() * response.data.length)].id;
                dispatchUpdateSelectedCollegeId(randomCollegeId);
            }

            setData(response.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    // This runs on mount and every time the tableDataType changes
    // i.e., when the user clicks on a country map or course donut chart slice
    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const { type, value } = tableDataType;
            const response = await axios.get(`${config.API_BASE_URL}/colleges/list?type=${type}&value=${value}`);

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
            {loading ? <DataTableSkeleton /> : (
                <>
                    <h2>
                        {heading}
                    </h2>

                    <TableComponent
                        type={type}
                        data={data}
                        scrollY={scrollY}
                        dispatchUpdateSelectedCollegeId={dispatchUpdateSelectedCollegeId}
                        dispatchUpdateDetailsSectionVisible={dispatchUpdateDetailsSectionVisible}
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
    dispatchUpdateDetailsSectionVisible: (value) => dispatch(updateDetailsSectionVisible(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);

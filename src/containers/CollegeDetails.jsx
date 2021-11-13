/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import CollegeInfo from '../components/CollegeInfo';
import Table from '../components/Table';

import { updateSelectedCollegeId } from '../store/actions';

const CollegeDetails = ({
    selectedCollegeId,
    isOpenDetailsSection,
    dispatchUpdateSelectedCollegeId,
}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        const responses = {};

        const promises = [
            (async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}`);
                responses.college = response.data;
            })(),
            (async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}/similar`);
                responses.similarColleges = response.data;
            })(),
            (async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}/students`);
                responses.students = response.data;
            })(),
        ];
        await Promise.all(promises);

        setData(responses);
        setLoading(false);
    };

    useEffect(() => {
        if (selectedCollegeId) {
            fetchData();
        }
    }, [selectedCollegeId]);

    if (isOpenDetailsSection) {
        if (loading) {
            <h1>Loading...</h1>;
        } else {
            return (
                <section className="section college-details">
                    <CollegeInfo college={data.college} />

                    <h2>Students</h2>
                    <Table
                        type="students"
                        data={data.students}
                    />

                    <h2>Similar Colleges</h2>
                    <Table
                        type="colleges"
                        data={data.similarColleges}
                        dispatchUpdateSelectedCollegeId={dispatchUpdateSelectedCollegeId}
                    />
                </section>
            );
        }
    }

    return null;
};

const mapStateToProps = (state) => ({
    isOpenDetailsSection: state.isOpenDetailsSection,
    selectedCollegeId: state.selectedCollegeId,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateSelectedCollegeId: (value) => dispatch(updateSelectedCollegeId(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CollegeDetails);

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import CollegeInfo from '../components/CollegeInfo';
import Table from '../components/Table';

import { updateSelectedCollegeId, updateDetailsSectionVisible } from '../store/actions';
import useMediaQuery from '../hooks/useMediaQuery';

// AntD does not recognize styles in SCSS files
// The choice is either use LESS or CSS
// To convert to LESS at this stage of development will be a big headache
// So, for now, we will use CSS
import 'antd/dist/antd.css';
import '../styles/college-details/info.css';
import '../styles/college-details/stats.css';
import '../styles/college-details/student-details/card.css';

const CollegeDetails = ({
    selectedCollegeId,
    detailsSectionVisible,
    dispatchUpdateSelectedCollegeId,
    dispatchUpdateDetailsSectionVisible,
}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const isSmallDesktop = useMediaQuery('(max-width: 1100px)');
    const isTablet = useMediaQuery('(max-width: 876px)');
    const isMobile = useMediaQuery('(max-width: 768px)');

    // In small screens, this component will be rendered as a Drawer.
    // The width depends on the screen size.
    let drawerWidth = '50%';
    if (isTablet) {
        drawerWidth = '60%';
    }

    if (isMobile) {
        drawerWidth = '100%';
    }

    const fetchData = async () => {
        setLoading(true);

        const responses = {};

        // Get college details AND similar colleges AND students simultaneously.
        const promises = [
            (async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}`);
                responses.college = response.data;
            })(),
            (async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}/similar`);
                    responses.similarColleges = response.data;
                } catch (error) {
                    responses.similarColleges = [];
                }
            })(),
            (async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/colleges/${selectedCollegeId}/students`);
                    responses.students = response.data;
                } catch (error) {
                    responses.students = [];
                }
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
    }, [selectedCollegeId]); // Wee get the data only when the selected college id changes.

    const contentJsx = loading ? <h1>Loading...</h1> : (
        <>
            <CollegeInfo college={data.college} />

            <h2>Students</h2>
            <Table
                type="students"
                scrollY={350}
                data={data.students}
            />

            <h2>Similar Colleges</h2>
            <Table
                type="colleges"
                scrollY={300}
                isCollegeDetails // this colleges table is rendered in college details section
                data={data.similarColleges}
                dispatchUpdateSelectedCollegeId={dispatchUpdateSelectedCollegeId}
            />
        </>
    );

    return isSmallDesktop
        ? (
            <Drawer
                placement="right"
                mask={false}
                width={drawerWidth}
                onClose={() => dispatchUpdateDetailsSectionVisible(false)}
                visible={detailsSectionVisible}
                getContainer={false}
            >
                {contentJsx}
            </Drawer>
        ) : (
            <section className="section college-details">
                {contentJsx}
            </section>
        );
};

const mapStateToProps = (state) => ({
    selectedCollegeId: state.selectedCollegeId,
    detailsSectionVisible: state.detailsSectionVisible,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateSelectedCollegeId: (value) => dispatch(updateSelectedCollegeId(value)),
    dispatchUpdateDetailsSectionVisible: (value) => dispatch(updateDetailsSectionVisible(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CollegeDetails);

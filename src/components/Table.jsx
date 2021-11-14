/* eslint-disable react/prop-types */
import { Table as AntDTable } from 'antd';
import StudentDetails from './StudentDetails';

const Table = ({
    type, // which table to display - "college" or "student"
    data,
    scrollY, // height of the table, different for college and student
    isCollegeDetails, // whether this table is rendered in college details section
    dispatchUpdateSelectedCollegeId,
    dispatchUpdateDetailsSectionVisible,
}) => {
    let columns;
    let dataSource;
    if (type === 'colleges') {
        const mobileColumn = {
            title: 'College',
            responsive: ['xs'],
            render: (record) => {
                const {
                    id, name, country, yearFounded,
                } = record;

                return (
                    <div className="mobile-row">
                        <p>
                            ID:
                            {' '}
                            <span>{id}</span>
                        </p>
                        <p>
                            Name:
                            {' '}
                            <span>{name}</span>
                        </p>
                        <p>
                            Country:
                            {' '}
                            <span>{country}</span>
                        </p>
                        <p>
                            Year Founded:
                            {' '}
                            <span>{yearFounded}</span>
                        </p>
                    </div>
                );
            },
        };

        columns = [
            {
                title: 'ID', dataIndex: 'id', key: 'id', width: 70, responsive: ['sm'],
            },
            {
                title: 'Name', dataIndex: 'name', key: 'name', width: 350, responsive: ['sm'],
            },
            {
                title: 'Country', dataIndex: 'country', key: 'country', width: 200, responsive: ['sm'],
            },
            {
                title: 'Year Founded', dataIndex: 'yearFounded', key: 'yearFounded', width: 100, responsive: ['sm'],
            },
            mobileColumn,
        ];

        if (isCollegeDetails) { // if rendered in college details page, only show two columns
            columns = [
                {
                    title: 'ID', dataIndex: 'id', key: 'id', width: 100, responsive: ['sm'],
                },
                {
                    title: 'Name', dataIndex: 'name', key: 'name', responsive: ['sm'],
                },
                mobileColumn,
            ];
        }

        dataSource = data.map((college) => ({
            ...college,
            key: college.id,
            id: college.id.slice(-4).toUpperCase(),
        }));
    } else {
        columns = [
            {
                title: 'ID', dataIndex: 'id', key: 'id', width: 100,
            },
            {
                title: 'Name', dataIndex: 'name', key: 'name',
            },
        ];

        dataSource = data.map((student) => ({
            ...student,
            key: student.id,
            id: student.id.slice(-4).toUpperCase(),
        }));
    }

    return (
        <div>
            <AntDTable
                columns={columns}
                dataSource={dataSource}
                scroll={{ y: scrollY }}
                expandable={type === 'students' && {
                    expandedRowRender: (record) => (
                        <StudentDetails student={record} />
                    ),
                    expandRowByClick: type === 'students', // expand row by clicking anywhere in the whole row
                    expandIcon: null,
                }}
                onRow={(record) => ({
                    onClick: () => {
                        if (type === 'colleges') {
                            if (dispatchUpdateDetailsSectionVisible) {
                                dispatchUpdateDetailsSectionVisible(true);
                            }

                            window.scrollTo(0, 0);
                            dispatchUpdateSelectedCollegeId(record.key);
                        }
                    },
                })}
            />
        </div>
    );
};

export default Table;

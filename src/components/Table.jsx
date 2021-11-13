/* eslint-disable react/prop-types */
import { Table as AntDTable } from 'antd';
import StudentDetails from './StudentDetails';

const Table = ({
    type,
    data,
    scrollY,
    isCollegeDetails,
    dispatchUpdateSelectedCollegeId,
}) => {
    let columns;
    let dataSource;
    if (type === 'colleges') {
        columns = [
            {
                title: 'ID', dataIndex: 'id', key: 'id', width: 150,
            },
            {
                title: 'Name', dataIndex: 'name', key: 'name', width: 350,
            },
            {
                title: 'Country', dataIndex: 'country', key: 'country', width: 250,
            },
            {
                title: 'Year Founded', dataIndex: 'yearFounded', key: 'yearFounded', width: 150,
            },
        ];

        if (isCollegeDetails) { // if rendered in college details page, only show two columns
            columns = [
                {
                    title: 'ID', dataIndex: 'id', key: 'id', width: 100,
                },
                {
                    title: 'Name', dataIndex: 'name', key: 'name',
                },
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

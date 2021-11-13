/* eslint-disable react/prop-types */
import { Table as AntDTable } from 'antd';
import StudentDetails from './StudentDetails';

const Table = ({
    type,
    data,
    dispatchUpdateOpenDetailsSectionState,
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

        dataSource = data.map((college) => ({
            ...college,
            key: college.id,
            id: college.id.slice(-4).toUpperCase(),
        }));
    } else {
        columns = [
            {
                title: 'ID', dataIndex: 'id', key: 'id', width: 150,
            },
            {
                title: 'Name', dataIndex: 'name', key: 'name', width: 350,
            },
            {
                title: 'Year Of Batch', dataIndex: 'yearOfBatch', key: 'yearOfBatch', width: 150,
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
                scroll={{ y: 240 }}
                expandable={type === 'students' && {
                    expandedRowRender: (record) => (
                        <StudentDetails student={record} />
                    ),
                }}
                onRow={(record) => ({
                    onClick: () => {
                        if (type === 'colleges') {
                            if (dispatchUpdateOpenDetailsSectionState) {
                                dispatchUpdateOpenDetailsSectionState(true);
                            }

                            dispatchUpdateSelectedCollegeId(record.key);
                        }
                    },
                })}
            />
        </div>
    );
};

export default Table;

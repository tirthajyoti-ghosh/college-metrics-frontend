/* eslint-disable react/prop-types */
import {
    Card, Avatar, Tag,
} from 'antd';

const StudentDetails = ({ student }) => {
    const { Meta } = Card;

    return (
        <Card bordered={false}>
            <Meta
                avatar={<Avatar src={`https://avatars.dicebear.com/api/miniavs/${student.name}.svg`} />}
                title={student.name}
                description={(
                    <>
                        <p>
                            ID:
                            {' '}
                            <span>{student.id}</span>
                        </p>
                        <p>
                            Year of batch:
                            {' '}
                            <span>{student.yearOfBatch}</span>
                        </p>
                        <p>
                            Skills:
                            {' '}
                            <span>
                                {student.skills.map((skill) => (
                                    <Tag key={skill}>{skill}</Tag>
                                ))}
                            </span>
                        </p>

                    </>
                )}
            />
        </Card>
    );
};

export default StudentDetails;

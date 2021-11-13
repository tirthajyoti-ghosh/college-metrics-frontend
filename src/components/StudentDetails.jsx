/* eslint-disable react/prop-types */
import {
    Card, Avatar, Tag,
} from 'antd';

const StudentDetails = ({ student }) => {
    const { Meta } = Card;

    return (
        <Card style={{ width: 300, marginTop: 16 }} bordered={false}>
            <Meta
                avatar={<Avatar src={`https://avatars.dicebear.com/api/miniavs/${student.name}.svg`} />}
                title={student.name}
                description={(
                    <>
                        <p>
                            ID:
                            {' '}
                            {student.id}
                        </p>
                        <p>
                            Year of batch:
                            {' '}
                            {student.yearOfBatch}
                        </p>
                        <p>
                            Skills:
                            {' '}
                            {student.skills.map((skill) => (
                                <Tag key={skill}>{skill}</Tag>
                            ))}
                        </p>

                    </>
                )}
            />
        </Card>
    );
};

export default StudentDetails;

import Tabs from '@mui/material/Tabs';
import LinkTab from '../LinkTab';

export default function ClassroomTabs({ value, classroomId }) {
    return (
        <Tabs value={value} aria-label="nav tabs example">
            <LinkTab label="detail" href={`/classrooms/${classroomId ?? ''}`} />
            <LinkTab label="assignments" href={`/classrooms/${classroomId ?? ''}/assignments`} />
            <LinkTab label="scoreboard" href={`/classrooms/${classroomId ?? ''}/scoreboard`} />
            <LinkTab label="requests" href={`/classrooms/${classroomId ?? ''}/gradereviewrequest`} />
        </Tabs>
    )
}
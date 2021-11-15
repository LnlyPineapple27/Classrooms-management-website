import ClassroomCard from '../ClassroomCard'
import '../index.scss'

export default function ClassroomsList ({items}) {
    return (
        <div 
            className='classrooms-list' 
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                marginLeft: '-10px',
                padding: '1rem 0'
            }}
        >
            {items.map((item, index) => (
                <ClassroomCard
                    key={item.id}
                    header={item.description}
                    title={item.name}
                    subTitle={item.section}
                    actionTitle='Detail'
                    imgHref={`https://picsum.photos/id/${index}/100/200`}
                />
            ))}
        </div>)
}
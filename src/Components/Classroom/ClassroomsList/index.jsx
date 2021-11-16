import { React, useState, useEffect } from 'react'
import ClassroomCard from '../ClassroomCard'
import classroomAPI from '../../../APIs/classroomAPI';
import '../index.scss'

export default function ClassroomsList ({isReload}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
          let result = await classroomAPI.getAllClassrooms()
          setIsLoaded(true)
          console.log(result)
            
          if (result.isOk)
            setItems(result.data.classrooms)
          else
            setError(result)
        }
        fetchData()
    }, [isReload])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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
                        id={item.id}
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
}
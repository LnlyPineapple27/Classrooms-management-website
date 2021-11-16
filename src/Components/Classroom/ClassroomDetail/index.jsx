import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import classroomAPI from "../../../APIs/classroomAPI";
import '../index.scss'

export default function ClassroomDetail() {
    const [detail, setDetail] = useState({
        name: '',
        section:'',
        description:''
    })
    let params = useParams()
    useEffect(() => {
        let fetchData = async () => {
            let result = await classroomAPI.getClassroomDetail(params.classroomId)
            console.log(result.data && result.data.length > 0 ? result.data[0] : detail)
            setDetail(result.data[0])
        }
        fetchData()
        console.log(detail)
    },[])


    return (
        <div className="page-container">
            <div className="page-container__classroom-detail d-flex flex-column align-center">
                <h1 className="page-title">Classroom Detail</h1>
                <div className="classroom-detail">
                    <p className="classroom-detail__element classroom-name">
                        <span className="classroom-detail__element__label">Name: </span>
                        <span className="classroom-detail__element__content">{detail.name}</span>
                    </p>
                    <p className="classroom-detail__element classroom-section">
                        <span className="classroom-detail__element__label">Section: </span>
                        <span className="classroom-detail__element__content">{detail.section}</span>
                    </p>
                    <p className="classroom-detail__element classroom-description">
                        <span className="classroom-detail__element__label">Description: </span>
                        <span className="classroom-detail__element__content">{detail.description}</span>
                    </p>
                </div>
            </div>
        </div>
        
    )    
}
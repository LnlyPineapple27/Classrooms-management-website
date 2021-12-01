import { useParams } from "react-router-dom"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import assignmentAPI from '../../APIs/assignmentAPI'
import { useState, useEffect, useContext } from 'react'
import { NavbarElContext } from "../../Context/GlobalContext";
import ClassroomTabs from "../ClassroomTabs";
import { DataGrid } from "@material-ui/data-grid";
import * as React from 'react';
import classroomAPI from '../../APIs/classroomAPI'
export default function GradeBoard() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    let params = useParams();
    // ----------------------------------------------------------------
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [headerSave, setHeaderSave] = useState({})
    const [onclickRow, setOnclickRow] = useState({})

    const cookData = (data, columns_names) => {
        let id_list = [...new Set( data.map(item => item.userID))];
        let result = [];
      
        for(let i = 0; i < id_list.length; i++){

            let user_data = data.filter(item => item.userID === id_list[i])
            let row = {
                id: user_data[0].sid,
                name: user_data[0].studentName,
                userID: user_data[0].userID,
            }
            
            let sum = 0;
            for(let j = 0; j < columns_names.length; j++){
                let tmp_sumfuk = parseInt(user_data.find(item => item.assignmentName === columns_names[j]).score ?? 0);
                row[columns_names[j]] = tmp_sumfuk;

                if(tmp_sumfuk !== null) sum += tmp_sumfuk;
            }
            row['total'] = (sum / columns_names.length).toFixed(2);
            result.push(row)
            
        }
        return result
    }
    const mapAssignment = (data)=>{
        let result = {}
        for(let i = 0; i < data.length; i++){
            result[data[i].assignmentName] = data[i].assignmentID
        }
        
        console.log(result)
        return result
    }
    useEffect(() => {
        
        async function fetchData() {
            const response = await assignmentAPI.scoreboard(params.classroomId)
            if (!response.ok) {
                setColumns([])
                setData([])
            }
            else {
                const response_data = await response.json()
                let columns_names = [...new Set( response_data.map(item => item.assignmentName) )]
           
                let data_cols = [];
                data_cols.push({
                    field:'id',
                    headerName: 'Student ID',
                    flex: 1.0,
                })
                data_cols.push({
                    field:'name',
                    headerName: 'Name',
                    flex: 1.0,
                })
                data_cols.push({
                    field:'userID',
                    headerName: 'UserID',
                    flex: 1.0,
                })
                for (let i = 0; i < columns_names.length; i++) {
                    data_cols.push({
                        field: columns_names[i],
                        headerName: 'Assignment: ' + columns_names[i],
                        editable: true,
                        flex: 1.0,
                    })
                }
                data_cols.push({
                    field:'total',
                    headerName: 'Total Score',
                    flex: 1.0,
                })
                setNavbarEl({
                    classroomTabs: (<ClassroomTabs value={2} classroomId={params.classroomId} />),
                })
                setHeaderSave(mapAssignment(response_data))
                setData(cookData(response_data, columns_names))
                setColumns(data_cols)
            }
        }
        fetchData()
    }, [params.classroomId])

    
    const handleEditRowsModelChange = React.useCallback(async (model) => {
        console.log(model, Object.keys(model).length === 0)
        if(!model || Object.keys(model).length === 0) return
        console.log(onclickRow)
        let student_id = Object.keys(model)[0];
        let assignment_name = Object.keys(model[student_id])[0];
        console.log(assignment_name)
        let score = parseInt(model[student_id][assignment_name].value);
        console.log('score: ',score)
        let assignment_id = headerSave[assignment_name];
        console.log('Assignment ID',assignment_id)
        let userid = onclickRow['userID'];
        console.log('UserID: ',userid)
        await classroomAPI.updateScore(params.classroomId, assignment_id, score, userid)
            //console.log(score)
    }, []);


    return (
        <div>
            <DataGrid
                columns={columns}
                rows={data}
                autoHeight={true}
                autoResizeColumns={true}
                hideFooter={true}
                onEditRowsModelChange={handleEditRowsModelChange}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = data.filter((row) =>
                      selectedIDs.has(row.id.toString())
                    );
                    console.log('a')
                    setOnclickRow(selectedRowData[0])
                    //console.log(selectedRowData[0]);
                }}
            />
            {/* <Button variant="contained" color="primary" onClick={handleClickButton}>
                Show me grid data
            </Button> */}
        </div>
    );
 
}
    
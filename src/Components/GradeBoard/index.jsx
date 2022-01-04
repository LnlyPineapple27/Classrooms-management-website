import { useParams } from "react-router-dom"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import assignmentAPI from '../../APIs/assignmentAPI'
import { useState, useEffect, useContext } from 'react'
import { NavbarElContext } from "../../Context/GlobalContext";
import ClassroomTabs from "../ClassroomTabs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import classroomAPI from '../../APIs/classroomAPI'
import { TextField } from "@mui/material";
import accountAPI from "../../APIs/accountAPI";
import userAPI from "../../APIs/userAPI";

export default function GradeBoard() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    let params = useParams();
    // ----------------------------------------------------------------
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [headerSave, setHeaderSave] = useState({})
    const [role, setRole] = useState(2)

    const cookData = (response_data, columns_names) => {
        //console.log("data", data);
        let id_list = [...new Set( response_data.map(item => item.sid))];
        //console.log("id_list", id_list);
        let result = [];
      
        for(let i = 0; i < id_list.length; i++) {
            let user_data = response_data.filter(item => item.sid === id_list[i])
            let row = {
                id: user_data[0].sid,
                name: user_data[0].studentName,
                userID: user_data[0].userID,
            }
            
            let sum = 0;
            for(let j = 0; j < columns_names.length; j++){
                let tmp_sumfuk = Number(user_data.find(item => item.assignmentName === columns_names[j]).score ?? 0);
                
                if(tmp_sumfuk !== null) sum += tmp_sumfuk;

                tmp_sumfuk = tmp_sumfuk.toFixed(2);
                row[columns_names[j]] = tmp_sumfuk;
                console.log("tmp_sumfuk:", tmp_sumfuk);
                console.log("sum:", sum);
            }
            row['total'] = (sum / columns_names.length).toFixed(2);
            result.push(row)
            
        }
        //console.log("cook data", result);
        return result
    }

    const mapAssignment = (data)=>{
        let result = {}
        for(let i = 0; i < data.length; i++){
            result[data[i].assignmentName] = data[i].assignmentID
        }
        
        //console.log(result)
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
                //console.log("scoreboard data from get", response_data);
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
                let responseRole = await accountAPI.getRole(JSON.parse(localStorage.getItem("account") ?? "").id)
                if(responseRole.ok) {
                  setRole(await responseRole.json())
                }
            }
        }
        fetchData()
    }, [params.classroomId])

    const header_list = (data_row) => {
      //console.log("header_row", data_row)
      let result = []
      let h = Object.keys(data_row[0])
      //console.log("h: ", h)
      h.forEach(key => {
        if (key !== 'id' && key !== 'name' && key !== 'userID' && key !== 'total')
          result.push(<TableCell>{'Assignment: ' + key[0].toUpperCase() + key.substring(1)}</TableCell>)
        else
          result.push(<TableCell>{key[0].toUpperCase() + key.substring(1)}</TableCell>)
      })
      return result
    }

    const handleGradeUpdate = async (e, rowIndex, field) => {
      if((data.length > 0) && (data[rowIndex][field] !== null)) {
        // console.log(data)
        // console.log("Row number: ", rowIndex)
        // console.log("Assignment name: ", field)
        // console.log("Assignment id: ", headerSave[field])
        // console.log("Score: ", e.target.value)
        // console.log("Student id: ", data[rowIndex].id)
        // console.log("Classroom id: ", params.classroomId)

        let _classroomId = params.classroomId
        let _studentId = data[rowIndex].userID
        let _assignmentId = headerSave[field]
        let _score = e.target.value

        if(_classroomId && _studentId && _assignmentId && _score) {
          const response = await classroomAPI.updateScore(_classroomId, _assignmentId, _score, _studentId)
          if (!response.ok) {
            console.log("Update grade failed")
          }
          else {
            console.log("Update grade success")
          }
        }
      }
      else {
        console.log("No data to process")
      }
    }

    const row_cells = (data_row) => {
      let result = []   
      let h = Object.keys(data_row)
      h.forEach(key => {
        if(key !== 'id' && key !== 'name' && key !== 'userID' && key !== 'total') {
          result.push(
            <TableCell>
              <TextField
                  onBlur={(e) => handleGradeUpdate(e, data.indexOf(data_row), key)} 
                  type='number' 
                  variant="standard" 
                  min={0}
                  placeholder={data_row[key]}
                  disabled={!["0", "1"].includes(role.toString())}
              />
            </TableCell>)
        }
        else{
          result.push(<TableCell>{data_row[key]}</TableCell>)
        }
      })
      return result
    }
    
    return (
      //console.log("data", data),
      //console.log("rows: ", data.length),
        (data.length > 0)?
          (<TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {header_list(data)}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {row_cells(row)}
                    </TableRow>
                  ))
              }
              </TableBody>
            </Table>
          </TableContainer>)
          :
          (<p>Loading...</p>)
    );
}
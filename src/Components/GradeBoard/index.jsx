import MUIDataTable from "mui-datatables";
import { useParams } from "react-router-dom"
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import assignmentAPI from '../../APIs/assignmentAPI'
import { useState, useEffect } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

export default function GradeBoard() {
    
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    let params = useParams();
    // ----------------------------------------------------------------
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const cookData = (data, columns_names) => {
        let id_list = [...new Set( data.map(item => item.userID))];
        let result = [];
        for(let i = 0; i < id_list.length; i++){
            let user_data = data.filter(item => item.userID === id_list[i])
            let row = {
                sid: user_data[0].sid,
                name: user_data[0].studentName,
            }
            let sum = 0;
            for(let j = 0; j < columns_names.length; j++){
                let tmp_sumfuk = user_data.find(item => item.assignmentName === columns_names[j]).score;
                row[columns_names[j]] = tmp_sumfuk;
                if(tmp_sumfuk !== null) sum += tmp_sumfuk;
            }
            row['total'] = sum / columns_names.length;
            result.push(row)
        }
        return result
    }
        
        
    
    useEffect(() => {
        
        async function fetchData() {
            const response = await assignmentAPI.scoreboard(params.classroomId)
            if (!response.ok) {
                setColumns([])
            }
            else {
                const response_data = await response.json()
                let columns_names = [...new Set( response_data.map(item => item.assignmentName) )]
                setData(cookData(response_data, columns_names))
                let data_cols = [];
                data_cols.push({
                    name:'sid',
                    label: 'Student ID',
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (value)? value : 'unassigned';
                        }
                    }
                })
                data_cols.push({
                    name:'name',
                    label: 'Name',
                    options: {
                        filter: true,
                        sort: true,
                    }
                })
                for (let i = 0; i < columns_names.length; i++) {
                    data_cols.push({
                        name: columns_names[i],
                        label: 'Assignment: ' + columns_names[i],
                        options: {
                            filter: true,
                            sort: true,
                            customBodyRender: (value, tableMeta, updateValue) => {
                                // return (value)? 
                                //     <p style={{color: 'green'}}><b>{value}</b></p> 
                                //     : <p style={{color: 'red'}}>UNSUMMITED</p>;
                                return <FormControlLabel
                                            label=''
                                            value={value}
                                            control={<TextField type="number" value={value} />}
                                            onChange={event => updateValue(event.target.value)}
                                        />
                            }
                        }
                    })
                }
                data_cols.push({
                    name:'total',
                    label: 'Total Score',
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return  <p style={{color: 'blue'}}><b>{value}</b></p>;
                        }
                    }
                })
                setColumns(data_cols)
            }
        }
        fetchData()
    }, [params.classroomId])
   
  
   
    return (
        <ThemeProvider theme={theme}>
            <MUIDataTable
                title={"Grades of students in class"}
                data={data}
                columns={columns}
                options={{
                    search: true,
                    fixedHeader: true,
                    selectableRows: false,  
                    filter: true,
                    filterType: "dropdown",
                    resizableColumns: true,
                }}
            />
        </ThemeProvider>
    );
}

    //----------------------------------------------------------------
    
    // const columns = [
    //     {
    //       name: "Name",
    //       options: {
    //         filter: false,
    //         customBodyRender: (value, tableMeta, updateValue) => (
    //           <FormControlLabel
    //             label=""
    //             value={value}
    //             control={<TextField value={value} />}
    //             onChange={event => updateValue(event.target.value)}
    //           />
    //         )
    //       }
    //     },
    //     {
    //       name: "Title",
    //       options: {
    //         filter: true,
    //       }
    //     },
    //     {
    //       name: "Location",
    //       options: {
    //         filter: true,
    //         // customBodyRender: (value, tableMeta, updateValue) => {
    //         //   return (
    //         //     <Cities
    //         //       value={value}
    //         //       index={tableMeta.columnIndex}
    //         //       change={event => updateValue(event)}
    //         //     />
    //         //   );
    //         // },
    //       }
    //     },
    //     {
    //       name: "Age",
    //       options: {
    //         filter: false,
    //         customBodyRender: (value, tableMeta, updateValue) => (
    //           <FormControlLabel
    //             label=""
    //             control={<TextField value={value || ''} type='number' />}
    //             onChange={event => updateValue(event.target.value)}
    //           />
    //         )
    //       }
    //     },
    //     {
    //       name: "Salary",
    //       options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
  
    //           const nf = new Intl.NumberFormat('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2
    //           });
  
    //           return nf.format(value);
    //         }
    //       }
    //     },
    //     {
    //       name: "Active",
    //       options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
  
    //           return (
    //             <FormControlLabel
    //               label={value ? "Yes" : "No"}
    //               value={value ? "Yes" : "No"}
    //               control={
    //                 <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
    //               }
    //               onChange={event => {
    //                 updateValue(event.target.value === "Yes" ? false : true);
    //               }}
    //             />
    //           );
  
    //         }
    //       }
    //     }
    //   ];
  
    //   const data = [
    //     ["Robin Duncan", "Business Analyst", "Los Angeles", null, 77000, false],
    //     ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, null, true],
    //     ["Harper White", "Attorney", "Pittsburgh", 52, 420000, false],
    //     ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, 150000, true],
    //     ["Frankie Long", "Industrial Analyst", "Austin", 31, 170000, false],
    //     ["Brynn Robbins", "Business Analyst", "Norfolk", 22, 90000, true],
    //     ["Justice Mann", "Business Consultant", "Chicago", 24, 133000, false],
    //     ["Addison Navarro", "Business Management Analyst", "New York", 50, 295000, true],
    //     ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, 200000, false],
    //     ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, 400000, true],
    //     ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, 110000, false],
    //     ["Danny Leon", "Computer Scientist", "Newark", 60, 220000, true],
    //     ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, 180000, false],
    //     ["Jesse Hall", "Business Analyst", "Baltimore", 44, 99000, true],
    //     ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, 90000, false],
    //     ["Terry Macdonald", "Commercial Specialist", "Miami", 39, 140000, true],
    //     ["Justice Mccarthy", "Attorney", "Tucson", 26, 330000, false],
    //     ["Silver Carey", "Computer Scientist", "Memphis", 47, 250000, true],
    //     ["Franky Miles", "Industrial Analyst", "Buffalo", 49, 190000, false],
    //     ["Glen Nixon", "Corporate Counselor", "Arlington", 44, 80000, true],
    //     ["Gabby Strickland", "Business Process Consultant", "Scottsdale", 26, 45000, false],
    //     ["Mason Ray", "Computer Scientist", "San Francisco", 39, 142000, true]
    //   ];
  
    //   const options = {
    //     filter: true,
    //     filterType: 'dropdown',
    //     responsive: 'standard', 
    //     resizableColumns: true,
    //   };

    //   return (
    //     <ThemeProvider theme={theme}>
    //         <MUIDataTable
    //             title={"Grades of students in class id =" + params.classroomId}
    //             data={data} 
    //             columns={columns} 
    //             options={options}
    //         />
    //     </ThemeProvider>
    // );

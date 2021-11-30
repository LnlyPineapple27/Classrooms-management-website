import MUIDataTable from "mui-datatables";
import { useParams } from "react-router-dom"
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function GradeBoard() {

    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    
const columns = [
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "assignment1",
     label: "Assignment1",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "assignment2",
     label: "Assignment2",
     options: {
      filter: true,
      sort: false,
     }
    },
   ];
   
   const data = [
    { name: "Joe James", assignment1: 100, assignment2: 100, },
    { name: "John Walsh", assignment1: 34, assignment2: 10 },
    { name: "Bob Herm", assignment1: 30, assignment2: 12 },
    { name: "James Houston", assignment1: 100, assignment2: 67 },
   ];
   
   const options = {
     filterType: 'checkbox',
   };
   
    let params = useParams();
    return (
        <ThemeProvider theme={theme}>
            <MUIDataTable
                title={"Grades of students in class id =" + params.classroomId}
                data={data}
                columns={columns}
                //options={options}
            />
        </ThemeProvider>
    );
}
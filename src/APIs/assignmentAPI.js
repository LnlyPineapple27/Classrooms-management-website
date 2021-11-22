let API_URL = process.env.REACT_APP_API_URL + '/classrooms'

const assignmentAPI = {
    getAllAssignments: async classroomId => {
        const fetchURL = API_URL + `/${classroomId}/assignments`
        
        const fetchOption = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
        
        const response = await fetch(fetchURL, fetchOption)

        return response
    }
}

export default assignmentAPI

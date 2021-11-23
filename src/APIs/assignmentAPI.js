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
    },
    createAssignment: async (bodyData) => {
        const fetchURL = API_URL + `/${bodyData.classroomID}/assignments`
        
        const fetchOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        }
        
        const response = await fetch(fetchURL, fetchOption)

        return response
    },
    update: async (classroomId, assignmentId, formData) => {
        const fetchURL = API_URL + `/${classroomId}/assignments/${assignmentId}`
        
        const fetchOption = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(fetchURL, fetchOption)

        return response
    },
    remove: async (classroomId, assignmentId) => {
        const fetchURL = API_URL + `/${classroomId}/assignments/${assignmentId}`
        
        const fetchOption = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        }
        
        const response = await fetch(fetchURL, fetchOption)

        return response
    }
}

export default assignmentAPI

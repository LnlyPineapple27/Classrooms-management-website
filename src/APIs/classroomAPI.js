let API_URL = process.env.REACT_APP_API_URL + '/classrooms'

let getResultFromResponse = async response => {
    let result = {
        isOk: response.ok,
        data: null,
        status: response.status,
        message: null
    }
    result.data = result.isOk && await response.json()
    result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
    return result
}

let classroomAPI = {

    getAllClassrooms: async () => {
        let token = localStorage.getItem('token')
        let response = await fetch(API_URL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
        return  getResultFromResponse(response)
    },

    addClassroom: async classroomDetail => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classroomDetail) // body data type must match "Content-Type" header
        });

        return getResultFromResponse(response)
    },

    getClassroomDetail: async id => {
        let fetchURL = API_URL + `/${id}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
        let result = await getResultFromResponse(response)
        return result
    }
}
export default classroomAPI
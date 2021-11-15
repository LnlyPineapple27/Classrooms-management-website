let API_URL = process.env.REACT_APP_API_URL

let classroomAPI = {
    getAllClassrooms: async () => {
        let response = await fetch(API_URL)
        let result = {
            isOk: response.ok,
            data: null,
            status: response.status,
            message: null
        }
        result.data = result.isOk && await response.json()
        result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
        return result
    },

    addClassroom: async (classroomDetail) => {
        const response = await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classroomDetail) // body data type must match "Content-Type" header
        });

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
}
export default classroomAPI
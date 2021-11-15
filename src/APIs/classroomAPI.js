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

    addClassroom: async ({name, section, description}) => {
        
    }
}
export default classroomAPI
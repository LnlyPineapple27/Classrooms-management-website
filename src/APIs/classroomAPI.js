let API_URL = process.env.REACT_APP_API_URL + '/classrooms'

let getResultFromResponse = async response => {
    let result = {
        isOk: response.ok,
        data: null,
        status: response.status,
        message: null
    }
    
    result.data = result.isOk && await response.json()
    console.log(result)
    result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
    return result
}

let classroomAPI = {
    getAllClassrooms: async () => {
        let userId = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).userID : null
        
        if(!userId) return {
            isOk: false,
            data: null,
            status: 409,
            message: 'Unauthorize'} // not have get out

        let token = localStorage.getItem('token')
        let fetchURL = API_URL + `?userID=${userId}`
        let response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        return getResultFromResponse(response)
    },

    addClassroom: async classroomDetail => {
        let a = {...classroomDetail, userID: localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).userID : ''}
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a) // body data type must match "Content-Type" header
        });

        return getResultFromResponse(response)
    },

    getClassroomDetail: async id => {
        let fetchURL = `${API_URL}/${id}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
        let result = await getResultFromResponse(response)
        console.log(result)
        return result
    },

    getClassroomDetailGuest: async inviteCode => {
        let data = inviteCode.slice(1)
        
        let fetchURL = process.env.REACT_APP_API_URL + `/classrooms/invite/${data}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
        let result = await getResultFromResponse(response)
        return result
    },

    updateUserCode: async userCode => {
        
    } 
}

export default classroomAPI
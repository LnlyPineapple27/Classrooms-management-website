let originURL = process.env.REACT_APP_API_URL
let API_URL = originURL + '/classrooms'
const queryHelpers = require('./queryHelpers')


let getResultFromResponse = async response => {
    let result = {
        isOk: response.ok,
        data: null,
        status: response.status,
        message: null
    }
    
    result.data = result.isOk && await response.json()
    console.log(response)
    result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
    return result
}

let classroomAPI = {
    getAllClassrooms: async userId => {
        let token = localStorage.getItem('token')
        let fetchURL = API_URL + `?userID=${userId ?? ""}`
        let response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        }})
        console.log("a213123")
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
            'Content-Type': 'application/json'
        }})
        let result = await getResultFromResponse(response)
        return result
    },
    getRole: async (classroomId, userId) => {
        let fetchURL = process.env.REACT_APP_API_URL + `/classrooms/${classroomId}/users/${userId}/role`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }})
        return response
    },
    changeSid: async ({sid, userId, classroomId, name}) => {
        console.log('a')
        const fetchURL = API_URL + `/${classroomId}/sids`
        const fetchBody = JSON.stringify({
            name: name,
            sid: sid,
            classroomId: classroomId,
            userID: userId
        })
        console.log(fetchBody);
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
            body: fetchBody

        })
        return response
    },
    getClassroomsThatUserHasRoleTeacher: async userId => {
        const teacherRoleList = [0, 1]
        const query = queryHelpers.parseArray("roles", teacherRoleList)
        const fetchURL = `${originURL}/users/${userId}/classrooms?${query}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
        return response
    },
    importStudents: async ({classroomId, data}) => {
        const fetchURL = `${originURL}/classrooms/${classroomId}/sids/import`
        const fetchOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data})
        }
        return await fetch(fetchURL, fetchOption)
    },
    importScores: async ({classroomId, assignmentId, data}) => {
        const fetchURL = `${originURL}/classrooms/${classroomId}/assignments/${assignmentId}/scores/import`
        const fetchOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data})
        }
        return await fetch(fetchURL, fetchOption)
    },
    updateScore: async(classroomId, assignmentId, score, userid) => {
        const fetchURL = `${originURL}/classrooms/${classroomId}/assignments/${assignmentId}/scores/${userid}`
        const fetchOption = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({score: score})
        }
        return await fetch(fetchURL, fetchOption)
    }
}

export default classroomAPI
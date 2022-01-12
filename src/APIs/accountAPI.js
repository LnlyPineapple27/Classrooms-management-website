const API_ORIGIN_URL = process.env.REACT_APP_API_URL 
const API_URL = process.env.REACT_APP_API_URL + '/accounts'
const queryHelpers = require("./queryHelpers")

const getResultFromResponse = async response => {
    let result = {
        isOk: response.ok,
        data: null,
        status: response.status,
        message: null
    }
    result.data = result.isOk && await response.json()
    result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
    console.log('response:', result)
    return result
}

const validateEmail = email=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateProfileData = profileData => {
    let result = {
        isOk: false,
        data: {},
        status: 0,
        message: 'An error occurred: Invalid properties'
    }
    const profileValidValueOf = {
        sex: [0, 1, 2],
        dob: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
        email: validateEmail
    }
    const profileValidProps = ['name', 'dob', 'sex', 'email']
    
    if (!profileValidProps.every(prop => Object.keys(profileData).includes(prop))) return result
    
    let isOk = true
    for(let prop of profileValidProps) {
        switch(prop) {
            case 'sex':
                isOk = profileValidValueOf[prop].includes(profileData[prop])
                break
            case 'dob':
                isOk = profileValidValueOf[prop].test(profileData[prop])
                break
            case 'email':
                isOk = profileValidValueOf[prop](profileData.email.toLowerCase())
                break
            default:
                isOk = !!profileData[prop]
                break
        }
        if(!isOk) {
            result.message = `An error occurred: Invalid ${prop.toUpperCase()} value`
            break
        }
    }

    result.isOk = isOk

    return result
}

let accountAPI = {
    login : async (data) => {
        let fetchURL = API_URL + `/login`
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        let result = await getResultFromResponse(response)
        return result
    },
    register : async (data) => {
        let fetchURL = API_URL + `/register`
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        let result = await getResultFromResponse(response)
        return result
    },
    userProfile: async () => {
        let account = JSON.parse(localStorage.getItem('account')) ?? {}
        let id = account ? account.userID : 'undefined'
        let fetchURL = API_URL + `?id=${id}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        let result = await getResultFromResponse(response)
        

        return result
    },
    updateProfile: async profileData => {
        let validateData = validateProfileData(profileData)
        if(!validateData.isOk) return validateData

        let account = JSON.parse(localStorage.getItem('account')) ?? {}
        let putData = {...profileData, id:account ? account.userID : 'undefined'}
        let fetchURL = API_URL + `/update-user-info/${putData.id}`
        const response = await fetch(fetchURL, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        });

        console.log(response)

        let result = await getResultFromResponse(response)

        console.log(result)

        return result
    },
    joinClassroom: async (inviteLink, classroomId) => {
        let data = {
            role: parseInt(inviteLink[0]),
            inviteLink: inviteLink.slice(1),
            userID: localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).userID : 'a',
        }
        console.log('data', data)
        let fetchURL = process.env.REACT_APP_API_URL + '/classrooms/invite/join'
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        let result = await getResultFromResponse(response)

        console.log(result)

        return result
    },
    getAll: async roles => {
        let query = roles ? queryHelpers.parseArray("roles", roles) : "" 
        return await fetch(
            `${API_URL}?${query}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            }
        )
    },
    createAccount: async data => {
        return await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },
    banAccounts: async banList => {
        return await fetch(`${API_URL}/ban`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(banList)
        })
    },
    getRole: async accountId => {
        let fetchAPI = API_URL + `/${accountId}/role`
        return await fetch(fetchAPI, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
    },
    unMapSID: sid => {
        const fetchURL = API_ORIGIN_URL + '/sids/'
        const fetchOption = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ SID: sid })
        }
        return fetch(fetchURL, fetchOption)
    },
    changePasswordByEmail: (email, vCode, newPwd) => {
        const fetchURL = API_URL + '/password/forgot'
        const fetchOption = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, vCode: vCode, newPassword: newPwd })
        }
        return fetch(fetchURL, fetchOption) 
    }
}
export default accountAPI
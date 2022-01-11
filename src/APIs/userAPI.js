const API_URL = process.env.REACT_APP_API_URL + '/users'


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
    
    if (!Object.keys(profileData).every(prop => profileValidProps.includes(prop))) return result
    
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

let userAPI = {
    userProfile: async id => {
        let fetchURL = API_URL + `/${id}`
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        return response
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

        return response
    },
    verifyEmail: ({ email, vCode }) => {
        const fetchURL = API_URL + '/email/verify'
        const fetchOption = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, code: vCode })
        }
        return fetch(fetchURL, fetchOption)
    },
    sendOTP: email => {
        const fetchURL = API_URL + '/email/verify'
        const fetchOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }
        return fetch(fetchURL, fetchOption)
    },
}
export default userAPI
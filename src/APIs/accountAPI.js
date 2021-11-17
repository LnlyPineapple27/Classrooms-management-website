let API_URL = process.env.REACT_APP_API_URL + '/account'

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
        
        console.log(result)

        return result
    }
}
export default accountAPI
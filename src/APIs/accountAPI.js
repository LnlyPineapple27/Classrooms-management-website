let API_URL = process.env.REACT_APP_API_URL + '/account'

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
}
export default accountAPI
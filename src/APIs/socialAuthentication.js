let API_URL = process.env.REACT_APP_API_URL + '/auth'

const getResultFromResponse = async response => {
    let result = {
        isOk: response.ok,
        data: null,
        status: response.status,
        message: null
    }
    result.data = result.isOk && await response.json()
    console.log('a', result)
    result.message = result.isOk ? 'Request success' : `An error has occurred: ${response.status}`
    return result
}


let authAPI = {
    googleAuthentication : async (ggtoken) => {
        let fetchURL = API_URL + `/google-authentication`
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                //'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_token": ggtoken
            })
        });
        let result = await getResultFromResponse(response)
        return result
    }
}
export default authAPI
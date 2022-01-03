const API_URL = process.env.REACT_APP_API_URL + "/sids"

export function updateOrCreateIfNotExist(sId, userId) {
    let fetchURL = API_URL
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sid: sId, userID: userId }) 
    }
    return fetch(fetchURL, options)
}

/*
const _headers = {
    'X-MAGICBELL-API-SECRET': 'c6493f64570222c3cb2c67f739946cb574876fe5',
    'X-MAGICBELL-API-KEY': '95cd7bd4a5452bd5ee1f798615475395c4d4d935',
  };

const notificationAPI = {
    sendNotification: async (_title, _content, _recipients) => {
        const fetchURL = 'https://api.magicbell.com/notifications'
        const _data = {
            notification: {
                title: _title,
                content: _content,
                category: 'new_message',
                action_url: '',
                recipients: _recipients,
            },
        };
        const fetchOption = {
            method: 'POST',
            headers: _headers,
            body: _data,
        };
        const response = await fetch(fetchURL, fetchOption);
        return response;
    },
}

export default notificationAPI;
*/
import axios from 'axios';

const headers = {
  'X-MAGICBELL-API-SECRET': 'c6493f64570222c3cb2c67f739946cb574876fe5',
  'X-MAGICBELL-API-KEY': '95cd7bd4a5452bd5ee1f798615475395c4d4d935',
};

const notificationAPI = {
    sendNotification: async (_title, _content, _recipients) => {
        const data = {
            notification: {
                title: _title,
                content: _content,
                category: 'new_message',
                action_url: 'https://github.com/',
                recipients: _recipients,
            },
        };

        return await axios.post('https://api.magicbell.com/notifications', data, { headers });
        // .then(response => console.log(response.data))
        // .catch(error => console.log(error));
    },
};
export default notificationAPI;
import axios from 'axios';

let frappe_site_url = "http://localhost:8001/api/resource";
let api_key = '4caa1fb44962403';
let api_secret_key = 'c9ffde8c1961297';

const frappe_api_key = axios.create({
    baseURL: frappe_site_url,
    headers: {
        'Authorization': `Token ${api_key}:${api_secret_key}`,
        "Content-Type": "application/json",
        'Accept': 'application/json',
    },
});
export default frappe_api_key;


// const user_frappe_api = JSON.parse(localStorage.getItem('formData'));

// if (!user_frappe_api) {
//     console.error("User Frappe API data is missing in localStorage");
//     throw new Error("User Frappe API data is not available. Please fill out the form.");
// }

// console.log('User Frappe API', user_frappe_api);

// let frappe_site_url_2 = user_frappe_api.websiteLink;
// let api_key_2 = user_frappe_api.apiKey;
// let api_secret_key_2 = user_frappe_api.token;

// const frappe_api_key_2 = axios.create({
//     baseURL: frappe_site_url_2,
//     headers: {
//         'Authorization': `Token ${api_key_2}:${api_secret_key_2}`,
//         "Content-Type": "application/json",
//         'Accept': 'application/json',
//     },
// });

// export default frappe_api_key_2;


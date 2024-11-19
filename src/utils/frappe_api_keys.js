import axios from 'axios';

// let frappe_website_hardcode = "http://localhost:8001/api/resource";
// let api_key_hardcode = '4caa1fb44962403';
// let api_secret_key_hardcode = 'c9ffde8c1961297';

// const frappe_api_key = axios.create({
//     baseURL: frappe_website_hardcode,
//     headers: {
//         'Authorization': `Token ${api_key_hardcode}:${api_secret_key_hardcode}`,
//         "Content-Type": "application/json",
//         'Accept': 'application/json',
//     },
// });
// export default frappe_api_key;


function frappe_api_key_2() {
    const user_frappe_api = JSON.parse(localStorage.getItem('formData'))
    const frappe_website = user_frappe_api.frappe_website
    const api_key = user_frappe_api.api_key
    const api_seceret_key = user_frappe_api.api_seceret_key
    return axios.create({
        baseURL:frappe_website,
        headers:{
            'Authorization': `Token ${api_key}:${api_seceret_key}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
        }
    })
}

export default frappe_api_key_2;


<script setup>
import { ref } from 'vue';
import frappe_api_key_2 from '@/utils/frappe_api_keys';
import { useToast } from 'vue-toastification';
import router from '@/router';
const toast = useToast()
const websiteLink = ref('');
const apiKey = ref('');
const token = ref('');
const websiteLinkError = ref(false);

const validateWebsiteLink = () => {
    const requiredString = '/api';
    websiteLinkError.value = !websiteLink.value.endsWith(requiredString);
};

const submitForm = async () => {
    validateWebsiteLink();
    if (websiteLinkError.value) return;

    // Store data in local storage
    const formData = {
        frappe_website: websiteLink.value,
        api_key: apiKey.value,
        api_seceret_key: token.value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    try {
        const call_frappe_api = frappe_api_key_2()
        const response = await call_frappe_api.get('/method/frappe.auth.get_logged_user')
        console.log(response);
        
        if (response.status==200){
            toast.success(`Welcome ${response.data.message} your Frappe API is verified`)
            router.push(`/home`);
        }
    } 
    catch (error) {
        console.log('Error Fetching Job', error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }


};
</script>

<template>
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="website-link" class="label">Your Frappe API Link</label>
                <input id="website-link" v-model="websiteLink" class="input" type="url" placeholder="Enter website link"
                    :class="{ 'input-error': websiteLinkError }" />
                <small class="text-muted">
                    Link: https://your_frappe_domain.com/api/</small>
                    <br>
                <small v-if="websiteLinkError" class="error-text">
                    URL must Ends with '/api'.
                </small>
            </div>

            <div class="form-group">
                <label for="api-key" class="label">API Key</label>
                <input id="api-key" v-model="apiKey" class="input" type="text" placeholder="Enter API Key" required />
            </div>

            <div class="form-group">
                <label for="token" class="label">Token</label>
                <input id="token" v-model="token" class="input" type="text" placeholder="Enter Token" required />
            </div>

            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #dcfce7;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1rem;
}

.label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #15803d;
}

.input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #dbeafe;
    border-radius: 4px;
    background-color: #dbeafe;
    color: #15803d;
}

.input-error {
    border-color: #f87171;
    background-color: #fecaca;
}

.error-text {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.submit-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: white;
    background-color: #22c55e;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #15803d;
}
</style>
<script setup>

// import { type } from 'server/reply';
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute, } from 'vue-router';
import { useToast } from 'vue-toastification';
// import frappe_api_key from '@/utils/frappe_api_keys';
import frappe_api_key_2 from '@/utils/frappe_api_keys';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill';


const route = useRoute()
const jobId = route.params.name

const form = reactive({
    employment_type: 'Full-Time',
    job_title: '',
    designation: '',
    lower_range: 300000,
    upper_range: 500000,
    location: '',
    company: '',
    company_description: '',
    company_email: '',
    company_phone: '',
    publish: 1,
    publish_salary_range: 1,
    salary_per: 'Year'
})


const state = reactive({
    job: {},
    isLoading: true
})

const toast = useToast()

const handleSubmit = async () => {
    console.log(form);
    const updateJob = {
        job_title: form.job_title,
        employment_type: form.employment_type,
        designation: form.designation,
        location: form.location,
        lower_range: form.lower_range,
        upper_range: form.upper_range,
        company: form.company,
        company_description: form.company_description,
        company_email: form.company_email,
        company_phone: form.company_phone,
        publish: 1,
        publish_salary_range: 1,
        salary_per: 'Year'
    };
    try {
        console.log('Inisde Try');
        // hardcode api
        // const response = await frappe_api_key.put(`/Job Opening/${jobId}`, updateJob);

        // dynamic api from local storage
        const call_frappe_api = frappe_api_key_2()
        const response = await call_frappe_api.put(`/resource/Job Opening/${jobId}`, updateJob);
        router.push(`/frappe-jobs/${response.data.data.name}`)
        // @todo -show toast
        toast.success('Job Updated Successfully');
    }
    catch (error) {
        console.log("Inside Catch");
        console.error('Error Fetching Job:', error);
        toast.error('Job Was Not Updated');
    }
};
const job_fields = ["name", "employment_type", "designation", "job_title", "description", "location", "lower_range", "upper_range", "company"];
const job_fields_json = encodeURIComponent(JSON.stringify(job_fields))
const company_fields = ["email", "phone_no", "company_description"]
const company_fields_json = encodeURIComponent(JSON.stringify(company_fields));
onMounted(async () => {
    try {
        // const response = await frappe_api_key.get(`/Job Opening?filters=[["name","=","${jobId}"]]&fields=${job_fields_json}`)
        // dynamic api from local storage
        const call_frappe_api = frappe_api_key_2()
        // get_company
        const company_response = await call_frappe_api.get(`/resource/Company`)
        let company_name = company_response.data.data[0].name;
        form.company = company_response.data.data[0].name;
        const company_details_response = await call_frappe_api.get(`/resource/Company?filters=[["name","=","${company_name}"]]&fields=${company_fields_json}`)
        form.company_email = company_details_response.data.data[0]['email'];
        form.company_phone = company_details_response.data.data[0]['phone_no']
        form.company_description = company_details_response.data.data[0]['company_description']

        const response = await call_frappe_api.get(`/resource/Job Opening?filters=[["name","=","${jobId}"]]&fields=${job_fields_json}`)
        state.job = response.data.data[0]

        // Populate to inputs
        form.employment_type = state.job.employment_type
        form.job_title = state.job.job_title
        form.description = state.job.description
        form.designation = state.job.designation
        form.lower_range = state.job.lower_range
        form.upper_range = state.job.upper_range
        form.location = state.job.location
        form.company = state.job.company
    } catch (error) {
        console.error('Error fetching job', error);
    }
    finally {
        state.isLoading = false
    }
})
</script>


<style>
/* CSS for your component, including external styles */
@import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

.ql-editor.read-mode ol {
    list-style-type: disc !important;
    padding-left: 40px;
}
</style>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

                    <div class="mb-4">
                        <label for="employment_type" class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select v-model="form.employment_type" id="employment_type" name="employment_type"
                            class="border rounded w-full py-2 px-3" required>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input v-model="form.job_title" type="text" id="job_title" name="job_title"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami"
                            required />
                    </div>
                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Department</label>
                        <select v-model="form.designation" id="designation" name="designation"
                            class="border rounded w-full py-2 px-3" required>
                            <option value="Accountant">Accountant</option>
                            <option value="Administrative Assistant">Administrative Assistant</option>
                            <option value="Administrative Officer">Administrative Officer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Associate">Associate</option>
                            <option value="Business Analyst">Business Analyst</option>
                            <option value="Business Development Manager">Business Development Manager</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Chief Executive Officer">Chief Executive Officer</option>
                            <option value="Chief Financial Officer">Chief Financial Officer</option>
                            <option value="Chief Operating Officer">Chief Operating Officer</option>
                            <option value="Chief Technology Officer">Chief Technology Officer</option>
                            <option value="Customer Service Representative">Customer Service Representative</option>
                            <option value="Designer">Designer</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Executive Assistant">Executive Assistant</option>
                            <option value="Finance Manager">Finance Manager</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Head of Marketing and Sales">Head of Marketing and Sales</option>
                            <option value="Manager">Manager</option>
                            <option value="Managing Director">Managing Director</option>
                            <option value="Marketing Manager">Marketing Manager</option>
                            <option value="Marketing Specialist">Marketing Specialist</option>
                            <option value="President">President</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="Secretary">Secretary</option>
                            <option value="Software Developer">Software Developer</option>
                            <option value="Vice President">Vice President</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="lower_range" class="block text-gray-700 font-bold mb-2">Min Salary</label>
                        <input v-model="form.lower_range" type="text" id="lower_range" name="lower_range"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami"
                            required />
                    </div>
                    <div class="mb-4">
                        <label for="upper_range" class="block text-gray-700 font-bold mb-2">Max Salary</label>
                        <input v-model="form.upper_range" type="text" id="upper_range" name="upper_range"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami"
                            required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Location
                        </label>
                        <input v-model="form.location" type="text" id="location" name="location"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required />
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input v-model="form.company" type="text" id="company" name="company"
                            class="border rounded w-full py-2 px-3" placeholder="Company Name" readonly />
                    </div>
                    <div class="mb-4">
                        <label for="company_description" class="block text-gray-700 font-bold mb-2">Company
                            Description</label>
                        <!-- Separate container for the HTML content -->
                        <div id="company_description" class="border rounded w-full py-2 px-3"
                            style="min-height: 100px; background-color: #fff;">
                            <div v-html="form.company_description"></div>
                        </div>
                    </div>


                    <div class="mb-4">
                        <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
                        <input v-model="form.company_email" type="email" id="contact_email" name="contact_email"
                            class="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required
                            readonly />
                    </div>
                    <div class="mb-4">
                        <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                        <input v-model="form.company_phone" type="tel" id="contact_phone" name="contact_phone"
                            class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants"
                            readonly />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
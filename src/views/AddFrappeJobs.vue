<script setup>

// import { type } from 'server/reply';
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { data } from 'autoprefixer';

const form = reactive({
  employment_type: 'Full-Time',
  job_title: 'Frappe/ERPNext Developer',
  description: 'Any One Can Apply',
  designation: 'ERPNext Consultant',
  lower_range: 300000,
  upper_range: 500000,
  location: 'Gulbarga',
  company: 'StandardTouch (Demo)',
  custom_company_description: 'Open Source',
  custom_company_email: 'anwarpatelrazvi@gmail.com',
  custom_company_phone: '9538405805',
  publish: 1,
  publish_salary_range: 1,
  salary_per: 'Year'
})

const toast = useToast()

const handleSubmit = async () => {
  const newJob = {
    job_title: form.job_title,
    employment_type: form.employment_type,
    designation: form.designation,
    location: form.location,
    description: form.description,
    lower_range: form.lower_range,
    upper_range: form.upper_range,
    company: form.company,
    custom_company_description: form.custom_company_description,
    custom_company_email: form.custom_company_email,
    custom_company_phone: form.custom_company_phone,
    publish: 1,
    publish_salary_range: 1,
    salary_per: 'Year'
  };

  // Log the endpoint
  console.log("Endpoint:", 'http://localhost:8001/api/resource/Job%20Opening');

  // Log the payload
  console.log("Payload (newJob):", newJob);

  // Log the headers
  const headers = {
    'Authorization': 'Token 4caa1fb44962403:1f04655ff24df15',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  console.log("Headers:", headers);

  try {
    const frappe_response = await axios.post(
      'http://localhost:8001/api/resource/Job Opening',
      newJob,
      { headers }
    );

    console.log('Frappe Response:', frappe_response);
    router.push(`/jobs/${frappe_response.data.data.name}`);
    toast.success('Job Added Successfully');
  }
  catch (error) {
    console.log("Inside Catch");
    console.error('Error Fetching Job:', error);
    toast.error('Job Was Not Added');
  }
};

</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Frappe Job</h2>

          <div class="mb-4">
            <label for="employment_type" class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="form.employment_type" id="employment_type" name="employment_type"
              class="border rounded w-full py-2 px-3" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input v-model="form.job_title" type="text" id="job_title" name="job_title"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea v-model="form.description" id="description" name="description"
              class="border rounded w-full py-2 px-3" rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"></textarea>
          </div>
          <div class="mb-4">
            <label for="lower_range" class="block text-gray-700 font-bold mb-2">Minimum Salary</label>
            <input v-model="form.lower_range" type="text" id="lower_range" name="lower_range"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
          </div>
          <div class="mb-4">
            <label for="upper_range" class="block text-gray-700 font-bold mb-2">Maximum Salary</label>
            <input v-model="form.upper_range" type="text" id="upper_range" name="upper_range"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
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
              class="border rounded w-full py-2 px-3" placeholder="Company Name" />
          </div>

          <div class="mb-4">
            <label for="custom_company_description" class="block text-gray-700 font-bold mb-2">Company
              Description</label>
            <textarea v-model="form.custom_company_description" id="custom_company_description"
              name="custom_company_description" class="border rounded w-full py-2 px-3" rows="4"
              placeholder="What does your company do?"></textarea>
          </div>

          <div class="mb-4">
            <label for="custom_company_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input v-model="form.custom_company_email" type="email" id="contact_email" name="custom_company_email"
              class="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required />
          </div>
          <div class="mb-4">
            <label for="custom_company_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input v-model="form.custom_company_phone" type="tel" id="custom_company_phone" name="custom_company_phone"
              class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants" />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>

// import { type } from 'server/reply';
import router from '@/router';
import { reactive, computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
// import frappe_api_key from '@/utils/frappe_api_keys';
import frappe_api_key_2 from '@/utils/frappe_api_keys';
// import { data } from 'autoprefixer';

const form = reactive({
  employment_type: 'Full-Time',
  job_title: '',
  description: '',
  designation: 'Software Developer',
  lower_range: 300000,
  upper_range: 500000,
  location: '',
  custom_location: '',
  company: '',
  company_description: '',
  company_email: '',
  company_phone: '',
  publish: 1,
  publish_salary_range: 1,
  salary_per: 'Year'
})

const toast = useToast()

const handleSubmit = async () => {
  let new_custom_location = form.location;
  if (form.custom_location) {
    new_custom_location = form.custom_location
  }
  else {
    new_custom_location = form.location
  }
  const newJob = {
    job_title: form.job_title,
    designation: form.designation,
    location: new_custom_location,
    description: form.description,
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
  const check_branch = {
    branch: newJob.location
  }

  // Log the new job
  console.log("New Job (newJob):", newJob);
  try {
    // hardcode api
    // const branch_response = await frappe_api_key.get(`/Branch?filters=[["branch","=","${check_branch.branch}"]]`);
    // console.log('Branch Response', branch_response);

    // dynamic api from local storage
    const call_frappe_api = frappe_api_key_2()
    const branch_response = await call_frappe_api.get(`/resource/Branch?filters=[["branch","=","${check_branch.branch}"]]`);
    console.log('Branch Response', branch_response);

    if (branch_response.data.data == 0) {
      console.log("No branch founded");
      const new_branch = {
        branch: newJob.location
      }
      const post_new_branch = await call_frappe_api.post('/resource/Branch', new_branch);
      console.log(post_new_branch);
    }

    const frappe_response = await call_frappe_api.post('/resource/Job Opening', newJob);

    console.log('Frappe Response:', frappe_response);
    router.push(`/frappe-jobs/${frappe_response.data.data.name}`);
    toast.success('Job Added Successfully');
  }
  catch (error) {
    console.log("Inside Catch");
    console.error('Error Fetching Job:', error);
    toast.error('Job Was Not Added');
  }
};
const effectiveLocation = computed({
  get() {
    return form.location === 'Create New Branch' ? form.custom_location : form.location;
  },
  set(value) {
    if (form.location === 'Create New Branch') {
      form.custom_location = value;
    } else {
      form.location = value;
    }
  }
});
const branches = ref([]);
onMounted(async () => {
  try {
    const call_frappe_api = frappe_api_key_2()
    // Get Company
    const company_response = await call_frappe_api.get(`/resource/Company?limit_start=1&amp;limit=1`)
    let company_name = company_response.data.data[0].name;
    form.company = company_response.data.data[0].name;
    // console.log(company_name);
    const company_fields = ["email", "phone_no", "company_description"]
    const company_fields_json = encodeURIComponent(JSON.stringify(company_fields));
    const company_details_response = await call_frappe_api.get(`/resource/Company?filters=[["name","=","${company_name}"]]&fields=${company_fields_json}`)
    form.company_email = company_details_response.data.data[0]['email'];
    form.company_phone = company_details_response.data.data[0]['phone_no']
    form.company_description = company_details_response.data.data[0]['company_description']

    //Getting Branches of company
    const all_branch_response = await call_frappe_api.get(`/resource/Branch?as_dict=False`)
    const all_branch = all_branch_response.data.data
    branches.value = all_branch.map(branch => branch[0])
    branches.value.push('Create New Branch');
    // console.log('Array Branch', branches);
    // console.log(all_branch);
  } catch (error) {
    console.error('Error fetching job', error);
  }
})
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
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input v-model="form.job_title" type="text" id="job_title" name="job_title"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Frappe/ERPNext Developer" required />
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
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea v-model="form.description" id="description" name="description"
              class="border rounded w-full py-2 px-3" rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"></textarea>
          </div>
          <div class="mb-4">
            <label for="lower_range" class="block text-gray-700 font-bold mb-2">Min Salary</label>
            <input v-model="form.lower_range" type="text" id="lower_range" name="lower_range"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
          </div>
          <div class="mb-4">
            <label for="upper_range" class="block text-gray-700 font-bold mb-2">Max Salary</label>
            <input v-model="form.upper_range" type="text" id="upper_range" name="upper_range"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
          </div>
          <!-- 
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Location <small class=" text-gray-700 font-bold mb-1">(Will Create Branch in ERPNext)</small>
            </label>
            <input v-model="form.location" type="text" id="location" name="location"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required />
          </div> -->

          <!-- Branches From ERPNext -->
          <div class="mb-4">
            <label for="location" class="block text-gray-700 font-bold mb-2">Job Location</label>
            <select v-model="form.location" id="location" name="location" class="border rounded w-full py-2 px-3"
              required>
              <option v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</option>
            </select>
          </div>
          <!-- Condition should check for 'Others' in location -->
          <div class="mb-4" v-if="form.location === 'Create New Branch'">
            <label for="custom_location" class="block text-gray-700 font-bold mb-2">Specify Job Location</label>
            <input type="text" v-model="form.custom_location" id="custom_location" name="custom_location"
              class="border rounded w-full py-2 px-3" required>
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input v-model="form.company" type="text" id="company" name="company"
              class="border rounded w-full py-2 px-3" placeholder="Company Name" readonly />
          </div>

          <div class="mb-4">
            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
            <div id="company_description" class="border rounded w-full py-2 px-3"
              style="min-height: 100px; background-color: #fff;">
              <div v-html="form.company_description" class="html-content"></div>
            </div>
          </div>


          <div class="mb-4">
            <label for="company_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input v-model="form.company_email" type="email" id="contact_email" name="company_email"
              class="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required readonly />
          </div>
          <div class="mb-4">
            <label for="company_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input v-model="form.company_phone" type="tel" id="company_phone" name="company_phone"
              class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants" readonly />
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
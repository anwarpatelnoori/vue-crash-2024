<script setup>
    import { RouterLink } from 'vue-router';
    import Card from '@/components/Card.vue'
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <Card bg = "bg-green-100">
                    <h2 class="text-2xl font-bold">For Developers</h2>
                    <p class="mt-2 mb-4">
                        Browse our Frappe/ERPNext jobs and start your career today
                    </p>
                    <RouterLink to=/jobs/view-frappe-all-jobs class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Jobs
                    </RouterLink>
                </Card>
                <Card bg = "bg-blue-100">
                    <h2 class="text-2xl font-bold">For Employers</h2>
                    <p class="mt-2 mb-4">
                        List your job to find the perfect developer for the role
                    </p>
                    <RouterLink to=/jobs/add-frappe-jobs
                        class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
                        Add Job
                    </RouterLink>
                </Card>
            </div>
        </div>
    </section>
</template>
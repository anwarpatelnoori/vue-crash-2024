<script setup>
import Hero from '@/components/Hero.vue';
import HomeCard from '@/components/HomeCard.vue';
import FrappeAllJobsListing from '@/components/Frappe Job Components/FrappeAllJobsListing.vue';
</script>

<template>
    <Hero title="Vue Developer"/>
    <HomeCard/>
    <FrappeAllJobsListing :limit="3" :showButton="true"/>
</template>
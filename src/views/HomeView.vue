<script setup>
import Hero from '@/components/Hero.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobsListing from '@/components/JobListings.vue';
</script>

<template>
    <Hero title="Vue Developer"/>
    <HomeCard/>
    <JobsListing :limit="3" :showButton="true"/>
</template>
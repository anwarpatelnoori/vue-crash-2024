<script>
export default {
  data(){
    return {
      name:'anwar',
      status:'pending',
      tasks:['Task One','T2','T3','t4'],
      link:'https://www.google.co.in/'
    }
  },
  methods:{
    toggle_status(){
      if(this.status==='active'){
        this.status= 'pending'
      }
      else if(this.status==='pending'){
        this.status='inactive'
      }
      else{
        this.status='active'
      }
    }
  }
}
</script>
<template>
  <h1> {{ name }}</h1>
  <p v-if='status ==="active"'>User is Active</p>
  <p v-else-if ="status==='pending'">User is pending</p>
  <p v-else>No User</p>
  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">{{ task }}</li>
    <!-- <a v-bind:href="link">Click for Google</a> -->
    <a :href="link">Click for Google</a>
    <br>
    <!-- <button v-on:click="toggle_status">Change Status</button>     -->
    <button @click="toggle_status">Change Stauts</button>
  </ul>
</template>
<style>
h1{
  color: red;
}
</style>
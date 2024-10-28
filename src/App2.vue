<!-- Composition Api Long Form -->

<!-- <script>
import { ref } from 'vue';
export default {
    setup() {
        const name = ref("Anwar")
        const status = ref('active')
        const tasks = ref(['Task One', 'T2', 'T3', 't4'])

        const toggle_status = () => {
            if (status.value === 'active') {
                status.value = 'pending'
            }
            else if (status.value === 'pending') {
                status.value = 'inactive'
            }
            else {
                status.value = 'active'
            }
        };
        return{
            name,status,tasks,toggle_status
        }
    }
}
</script> -->


<!-- Compostion short form -->
<script setup>
import { onMounted, ref } from 'vue';

const name = ref("Patel")
const status = ref('active')
const tasks = ref(['Task One', 'T2', 'T3', 't4'])
const new_task = ref('')

const toggle_status = () => {
    if (status.value === 'active') {
        status.value = 'pending'
    }
    else if (status.value === 'pending') {
        status.value = 'inactive'
    }
    else {
        status.value = 'active'
    }
};
const add_task = ()=>{
    if(new_task.value.trim()!==''){
        tasks.value.push(new_task.value)
        new_task.value='';
    }
}
const delete_task = (index)=>{
    tasks.value.splice(index,1)
}

onMounted(async ()=>{
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data  = await response.json()
        tasks.value = data.map((task)=>task.title)
    }
    catch(error){
        console.log(error);
        console.log('Error Fetching tasks');
    }
})
</script>
<template>
    <body>
        
        <h1> {{ name }}</h1>
        <p v-if='status === "active"'>User is Active</p>
        <p v-else-if="status === 'pending'">User is pending</p>
        <p v-else>No User</p>
        <form @submit.prevent="add_task">
            <label for="new_task">Add Task</label>
            <input type="text" id="new_task" name = "new_task" v-model="new_task"/>
            <button type="submit">Submit</button>
        </form>
        <h3>Tasks:</h3>
        <ul>
            <li v-for="(task, index) in tasks" :key="task">
                <span>
                    {{ task }}
                </span>
                <button @click="delete_task(index)">X</button>
            </li>
        </ul>
        <button @click="toggle_status">Change Stauts</button>
    </body>
</template>
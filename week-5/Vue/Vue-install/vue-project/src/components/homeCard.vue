<script setup>
import { ref, onMounted } from "vue";
import TaskList from "./TaskList.vue";
import { Plus } from "lucide-vue-next";
import Modal from "./Modal.vue";
import { CalendarComponent } from "@syncfusion/ej2-vue-calendars";

// Modal Control
const isModalOpen = ref(false);
const openModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };

// Initial Dummy Tasks
const dummyTasks = [
  {
    id: 1,
    title: "Finish Vue Project",
    description: "Complete the final touches on the Vue.js project.",
    priority: "High",
    dueDate: "2025-03-15",
    type: "Development",
  },
  {
    id: 2,
    title: "Write Blog Post",
    description: "Write a blog about Vue 3 composition API.",
    priority: "Medium",
    dueDate: "2025-03-18",
    type: "Content",
  },
  {
    id: 3,
    title: "Team Meeting",
    description: "Discuss project progress and blockers.",
    priority: "Low",
    dueDate: "2025-03-10",
    type: "Management",
  },
  {
    id: 4,
    title: "Fix Bugs",
    description: "Fix the reported UI issues from QA team.",
    priority: "High",
    dueDate: "2025-03-12",
    type: "Bug Fix",
  },
];

// Task List
const tasks = ref([]);

// Load tasks from localStorage on mount
onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  } else {
    tasks.value = dummyTasks;
    localStorage.setItem("tasks", JSON.stringify(dummyTasks));
  }
});

// Handle New Task Created from Modal
const handleCreateTask = (newTask) => {
  console.log("Received Task in Parent:", newTask);
  tasks.value.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
  closeModal();
};

const selectedTask = ref(null); 

// Called when TaskList emits "edit-task"
const startEditTask = (task) => {
  selectedTask.value = { ...task };
  isModalOpen.value = true;
};



const handleEditTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
  selectedTask.value = null;
  closeModal();
};

const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
  console.log("Deleted Task ID:", taskId);
};


</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-[80px] h-full w-[280px] bg-gray-800 text-white p-4 shadow-lg overflow-y-auto">
      <button
        class="flex mb-5 items-center cursor-pointer justify-center w-full h-12 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition"
        @click="openModal"
      >
        <Plus class="w-5 h-5 mr-2" /> Create Task
      </button>

           
      <CalendarComponent class="w-full bg-white text-black rounded-md p-2" /> 
    </aside>

    <!-- Main Content -->
    <section class="flex-1 ml-[280px] p-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 items-center gap-4 p-4 rounded-lg">
          <h1 class="text-2xl font-bold">Main Content Here</h1>
          <TaskList 
          :tasks="tasks" 
          :limit="3" 
          :showButton="true" 
          @edit-task="startEditTask"
           @delete-task="handleDeleteTask"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- Modal -->
  <Modal
  v-if="isModalOpen"
  :title="selectedTask ? 'Edit Task' : 'Create Task'"
  :taskToEdit="selectedTask"
  @close="closeModal"
  @create-task="handleCreateTask"
  @edit-task="handleEditTask"

  />
</template>

<style>
@import "@syncfusion/ej2-base/styles/material.css";
@import "@syncfusion/ej2-buttons/styles/material.css";
@import "@syncfusion/ej2-vue-calendars/styles/material.css";
</style>

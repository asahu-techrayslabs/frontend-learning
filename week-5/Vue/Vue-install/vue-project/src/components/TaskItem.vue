


<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  task: Object
});

const emit = defineEmits(['edit-task', 'delete-task']);

// State to control delete confirmation popup visibility
const showConfirmPopup = ref(false);

// Emit edit event
const handleEdit = () => {
  emit('edit-task', props.task);
  console.log("Editing Task:", props.task);
};

// Show confirmation popup
const confirmDelete = () => {
  showConfirmPopup.value = true;
};

// Emit delete event
const deleteTask = () => {
  emit('delete-task', props.task.id);
  console.log("'delete-task', props.task.id--Taskitem",props.task.id);
  showConfirmPopup.value = false;
};

// Close confirmation popup
const cancelDelete = () => {
  showConfirmPopup.value = false;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative p-4">
    <!-- Delete Icon -->
    <button
      @click="confirmDelete"
      type="button"
      aria-label="Delete"
      class="absolute top-5 right-4 hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-7 h-8 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>

    <!-- Task Info -->
    <div class="mb-6">
      <div class="text-gray-600 my-2">Priority: {{ task.priority }}</div>
      <h3 class="text-xl font-bold">{{ task.title }}</h3>
    </div>

    <div class="mb-5">{{ task.description }}</div>

    <h3 class="text-red-500 mb-2">Due Date: {{ task.dueDate }}</h3>

    <div class="border border-gray-100 mb-5"></div>

    <div class="flex flex-col lg:flex-row justify-between mb-4">
      <div class="text-green-700 mb-3">
        <i class="fa-solid fa-list-check text-lg"></i>
        {{ task.type }} Task
      </div>
      <button
        @click="handleEdit"
        class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Edit
      </button>
    </div>
  </div>

  <!-- Delete Confirmation Popup -->
  <div v-if="showConfirmPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-lg p-6 w-96">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
      <p class="text-gray-600 mb-5">Are you sure you want to delete this task?</p>
      <div class="flex justify-end gap-4">
        <button @click="cancelDelete" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
          Cancel
        </button>
        <button @click="deleteTask" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


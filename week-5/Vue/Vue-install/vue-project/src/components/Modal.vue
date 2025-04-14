<script setup>
import { ref, onMounted,watch} from "vue";
import { defineProps, defineEmits } from "vue";
import { X } from "lucide-vue-next";

// Props
const props = defineProps({
  title: String,
  taskToEdit: Object,
});

// Emit
const emit = defineEmits(["close", "create-task", "edit-task"]);

// Form Fields
const taskTitle = ref("");
const taskDescription = ref("");
const taskPriority = ref("Medium");
const taskDueDate = ref("");
const taskType = ref("General");

// Error Message
const errorMsg = ref("");

// Prefill fields if editing a task
onMounted(() => {
  if (props.taskToEdit) {
    taskTitle.value = props.taskToEdit.title || "";
    taskDescription.value = props.taskToEdit.description || "";
    taskPriority.value = props.taskToEdit.priority || "Medium";
    taskDueDate.value = props.taskToEdit.dueDate || "";
    taskType.value = props.taskToEdit.type || "General";
  }
});

// Submit Handler
const handleSubmit = () => {
  // if (!taskTitle.value.trim() || !taskDescription.value.trim() || !taskDueDate.value) {
  //   errorMsg.value = "Please fill all fields.";
  //   return;
  // }
  if (!taskTitle.value.trim()) {
  errorMsg.value = "Title is required.";
  return;
}

if (!taskDescription.value.trim()) {
  errorMsg.value = "Description is required.";
  return;
}

if (!taskDueDate.value) {
  errorMsg.value = "Due Date is required.";
  return;
}

  const newTask = {
    id: props.taskToEdit?.id || Date.now(), 
    title: taskTitle.value,
    description: taskDescription.value,
    priority: taskPriority.value,
    dueDate: formatDateTime(taskDueDate.value),
    type: taskType.value,
  };


  //"2025-03-11T10:11" -> "March 11, 2025, 10:11 AM"

  function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString('en-US', {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

  console.log("New Task Created/Edited", newTask);

  if (props.taskToEdit) {
    emit("edit-task", newTask); 
    console.log("edit-------------------------")
  } else {
    emit("create-task", newTask); 
    console.log("new task----------------------")
  }

  // Reset
  taskTitle.value = "";
  taskDescription.value = "";
  taskPriority.value = "Medium";
  taskDueDate.value = "";
  taskType.value = "General";
  errorMsg.value = "";

  emit("close");
};

const handleCancel = () => {
  
  // Reset form fields
  console.log("are i am handleCancel----------------")
  taskTitle.value = "";
  taskDescription.value = "";
  taskPriority.value = "Medium";
  taskDueDate.value = "";
  taskType.value = "General";
  errorMsg.value = "";
  window.location.reload();
  emit("close");
 

};

</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-xl shadow-lg w-96">
      <div class="flex justify-between items-center border-b pb-3 mb-4">
        <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
        <button @click="handleCancel" >
          <X class="w-6 h-6 text-gray-600 hover:text-red-600" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="text-sm font-medium">Task Title</label>
          <input v-model="taskTitle" type="text" class="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-green-300" placeholder="Enter title" />
        </div>

        <div>
          <label class="text-sm font-medium">Description</label>
          <textarea v-model="taskDescription" rows="3" class="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-green-300" placeholder="Enter description"></textarea>
        </div>

        <div>
          <label class="text-sm font-medium">Priority</label>
          <select v-model="taskPriority" class="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-green-300">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>   

        <div>
  <label class="text-sm font-medium">Due Date & Time</label>
  <input v-model="taskDueDate" type="datetime-local" class="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-green-300" />
</div>


        <!-- <div>
          <label class="text-sm font-medium">Task Type</label>
          <input v-model="taskType" type="text" class="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-green-300" placeholder="e.g., Development, Bug Fix" />
        </div> -->

        <div v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</div>

        <div class="flex justify-end space-x-2 pt-3">
          <button type="button" @click="handleCancel" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800">Cancel</button>

          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            {{ props.taskToEdit ? "Update Task" : "Add Task" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>





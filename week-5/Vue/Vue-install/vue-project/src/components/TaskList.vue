

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import TaskItem from "./TaskItem.vue";

// Props
const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["edit-task","delete-task"]);

// Toggle state
const isExpanded = ref(false);

// Computed: Tasks to display
const displayedTasks = computed(() => {
  if (props.limit && !isExpanded.value) {
    return props.tasks.slice(0, props.limit);
  }
  return props.tasks;
});

// Show View All / Show Less button
const showToggleButton = computed(() => {
  return props.showButton && props.tasks.length > props.limit;
});

// Toggle logic
const toggleTasks = () => {
  isExpanded.value = !isExpanded.value;
};

// Handle Edit Task
const handleEditTask = (task) => {
  emit("edit-task", task);
  console.log("edit-task----TASKLIST",task);
};

const handleDeleteTask = (taskId) => {
  emit("delete-task", taskId); // pass it to parent component
  console.log('Task Deleted passed from List:', taskId);
}
</script>

<template>
  <section class="mt-5">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">Task List</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskItem
          v-for="task in displayedTasks"
          :key="task.id"
          :task="task"
          @edit-task="handleEditTask"
          @delete-task="handleDeleteTask"
        />
      </div>
    </div>
  </section>

  <section v-if="showToggleButton" class="m-auto max-w-lg my-10 px-6">
    <button
      @click="toggleTasks"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 w-full"
    >
      {{ isExpanded ? "Show Less" : "View All Tasks" }}
    </button>
  </section>
</template>

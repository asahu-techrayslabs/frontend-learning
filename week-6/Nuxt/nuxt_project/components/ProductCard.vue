<template>
  <v-card :loading="loading" class="mx-auto my-6 text-center" max-width="374">
    <!-- Loader Slot -->
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      />
    </template>

    <!-- Product Image -->
    <v-img
      :src="product.image"
      height="200"
      contain
      class="bg-grey-lighten-4"
    />

    <!-- Product Info -->
    <v-card-item>
      <v-card-title class="text-truncate">{{ product.title }}</v-card-title>
      <v-card-subtitle class="text-grey text-subtitle-2">
        ${{ product.price }}
      </v-card-subtitle>
    </v-card-item>

    <!-- View Details Button -->
    <v-card-actions class="justify-center">
      <v-btn
        color="deep-purple-darken-2"
        class="text-white"
        variant="elevated"
        :loading="loading"
        @click="handleViewDetails"
      >
        View Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { product } = defineProps(['product'])
const loading = ref(false)
const router = useRouter()

const handleViewDetails = () => {
  loading.value = true
  setTimeout(() => {
    router.push(`/products/${product.id}`)
  }, 500)
}
</script>
  
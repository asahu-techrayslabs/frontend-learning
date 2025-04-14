<template>
  <v-card class="pa-6 my-8 mx-auto" max-width="100%">
    <v-row>
      <!-- Product Image -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-img
          :src="product.image"
          max-width="400"
          max-height="400"
          contain
          class="rounded-lg"
        />
      </v-col>

      <!-- Product Details -->
      <v-col cols="12" md="6">
        <v-card-title class="text-h4 font-weight-bold my-4">
          {{ product.title }}
        </v-card-title>

        <v-card-subtitle class="text-h6 my-2">
          Price - ${{ product.price }}
        </v-card-subtitle>

        <v-divider class="my-4"></v-divider>

        <h3 class="text-subtitle-1 font-weight-bold mb-2">Product description:</h3>

        <p class="mb-6 text-body-1">{{ product.description }}</p>

        <v-btn color="deep-purple-darken-3" class="text-white" @click="addToCart(product)">
          <v-icon start>mdi-cart</v-icon>
          Add to Cart
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const { product } = defineProps(['product'])

const addToCart = (product) => {
  console.log('Added to cart:', product)
}
</script>

<style scoped>
</style>

<script>
import socksGreen from '@/assets/images/socks_green.jpg';
import socksBlue from '@/assets/images/socks_blue.jpg';
 
export default {
  data() {
        return {
            cart: 0,
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
              { id: 2234, color: 'green',  image: socksGreen, quantity: 50 },
              { id: 2235, color: 'blue', image: socksBlue, quantity: 0 },
            ]
        }
    },


    methods: {
        addToCart() {
            this.cart += 1
        },
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
    }
};
</script>

<template>
   <div class="nav-bar"></div>

<div class="cart">Cart({{ cart }})</div>

<div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <img v-bind:src="image">
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>

      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <div 
        v-for="(variant, index) in variants" 
        :key="variant.id" 
        @mouseover="updateVariant(index)" 
        class="color-circle" 
        :style="{ backgroundColor: variant.color }">
      </div>
      
      <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add to Cart</button>
    </div>
  </div>
</div>
</template>

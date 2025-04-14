<template>
  <!-- Carousel -->
  <v-carousel>
    <v-carousel-item
      src="https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
      cover
    />
    <v-carousel-item
      src="https://i.pinimg.com/originals/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
      cover
    />
    <v-carousel-item
      src="https://static.vecteezy.com/system/resources/previews/020/903/143/original/shoe-sale-banner-vector.jpg"
      cover
    />
  </v-carousel>

  <!-- Product Section -->
  <v-container fluid class="mt-4">
    <h2 class="text-h4 font-weight-bold mb-6 text-center">Our Products</h2>

    <v-slide-group show-arrows class="full-width-slide-group">
      <template v-for="(product, index) in products" :key="index">
        <v-slide-group-item>
          <v-card class="ma-4" width="300" elevation="5">
            <v-img :src="product.image" height="200px" cover />
            <v-card-title class="text-h6 font-weight-bold">
              {{ product.title }}
            </v-card-title>
            <v-card-subtitle class="text-body-2 line-clamp">
              Price - ${{ product.price }}
            </v-card-subtitle>
            <v-card-actions>
              <NuxtLink :to="`/products/${product.id}`">
                <v-btn color="primary" variant="flat">Shop Now</v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </template>
    </v-slide-group>
  </v-container>

 
 <!-- Creative Design Section -->
<v-row>
  <!-- Left Section: 3 Cards Layout with Dynamic Data -->
  <v-col cols="12" md="4">
    <v-row no-gutters>
      <!-- Left Big Card (Full Height) -->
      <v-col cols="6">
        <v-sheet
          class="pa-4 d-flex flex-column align-center justify-center"
          color="grey-lighten-3"
          height="424"
        >
          <div v-if="topProducts[0]" class="text-center">
            <v-img :src="topProducts[0].image" height="150px" contain class="mb-3" />
            <h4 class="text-h6 font-weight-bold">{{ topProducts[0].title }}</h4>
            <p class="mt-1">${{ topProducts[0].price }}</p>
          </div>
        </v-sheet>
      </v-col>

      <!-- Right Two Stacked Cards -->
      <v-col cols="6">
        <v-row no-gutters>
          <!-- Top Half Card -->
          <v-col cols="12">
            <v-sheet
              class="pa-4 d-flex flex-column align-center justify-center"
              color="grey-lighten-4"
              height="212"
            >
              <div v-if="topProducts[1]" class="text-center">
                <v-img :src="topProducts[1].image" height="100px" contain class="mb-2" />
                <h4 class="text-subtitle-1 font-weight-medium">{{ topProducts[1].title }}</h4>
                <p class="mt-1">${{ topProducts[1].price }}</p>
              </div>
            </v-sheet>
          </v-col>

          <!-- Bottom Half Card -->
          <v-col cols="12">
            <v-sheet
              class="pa-4 d-flex flex-column align-center justify-center"
              color="grey-lighten-5"
              height="212"
            >
              <div v-if="topProducts[2]" class="text-center">
                <v-img :src="topProducts[2].image" height="100px" contain class="mb-2" />
                <h4 class="text-subtitle-1 font-weight-medium">{{ topProducts[2].title }}</h4>
                <p class="mt-1">${{ topProducts[2].price }}</p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
 <!-- right section -->
  <v-col cols="12" md="8">
    <v-card flat height="100%" class="d-flex align-center justify-center" style="background-color: #f4f4f4;">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-img
            v-if="featuredProduct"
            :src="featuredProduct.image"
            width="300"
            height="300"
            class="mr-5"
            cover
          />
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center text-center">
          <h2 class="font-weight-bold">{{ featuredProduct?.title }}</h2>
          <p>Price - ${{ featuredProduct?.price }}</p>
         

          <NuxtLink to="/products"> <v-btn color="primary" class="mt-4" rounded="lg" size="large">
            Explore Now
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn></NuxtLink>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</v-row>

</template>

<script setup>
const { data: products } = await useFetch('https://fakestoreapi.com/products')

// Get top 3 products
const topProducts = computed(() => products.value?.slice(0, 3) || [])

// Featured product for right section
const featuredProduct = computed(() => products.value?.[3])

// definePageMeta({
//     // middleware:function(to,from){
//     //  const authenticated=useCookie('user')
//     //  console.log(authenticated)
//     //  if(!authenticated.value){
//     //   console.log("inside condition")
//     //   return navigateTo('/login')
//     //  }   
//     // }
//     middleware:[]
//   })

</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.full-width-slide-group {
  width: 100vw;
  padding-left: 16px;
  padding-right: 16px;
  overflow-x: auto;
}
</style>

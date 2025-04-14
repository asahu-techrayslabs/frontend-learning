<script setup>
  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]
</script>

<template>
  <v-app>
    <!-- Custom Header with Tailwind CSS -->
    <!-- <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Nuxt Practice</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/" class="hover:text-primary">Home</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-primary">About</NuxtLink></li>
          <li><NuxtLink to="/products" class="hover:text-primary">Products</NuxtLink></li>
        </ul>
      </nav>
    </header> -->

    <v-toolbar >
     
      <v-toolbar-title text="Vuetify"></v-toolbar-title>

      <template v-slot:append>
        <NuxtLink to="/"><v-btn>Home</v-btn></NuxtLink>
        <!-- <NuxtLink to="/about"><v-btn >About</v-btn></NuxtLink> -->
        <NuxtLink to="/admin"><v-btn >Admin</v-btn></NuxtLink>
        <NuxtLink to="/products"><v-btn >Products</v-btn></NuxtLink>
        <NuxtLink to="/login"><v-btn >Login</v-btn></NuxtLink>
        <NuxtLink to="/logout"><v-btn >Logout</v-btn></NuxtLink>
      </template>
    </v-toolbar>

    <!-- Vuetify Page Wrapper -->
    <v-main>
      <div class="container mx-auto p-4">
       <slot/>
      </div>
    </v-main>

<!-- footer -->

<v-footer class="text-center d-flex flex-column ga-2 py-4" color="indigo-lighten-1">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-60">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>


  </v-app>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>

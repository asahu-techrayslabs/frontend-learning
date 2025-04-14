
<template>
  <header>
    <div class="wrapper">
      <h1 class="title">You did it!</h1>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink :to="{ name: 'jobs' }">Jobs</RouterLink>
      </nav>
    </div>

    <button @click="redirected">Redirect</button>
    <button @click="back">Go Back</button>
    <button @click="forward">Go forward</button>

  </header>

  <RouterView />
</template>

<script>

 export default{
  methods:{
    redirected(){
      this.$router.push({name:'home'})
    },
    back(){
      this.$router.go(-1)
    },
    forward(){
      this.$router.go(1)
    }
    
  }
 }

</script>

<style scoped>
/* Wrapper Styling */
.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Nav Links Styling */
.nav-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.nav-links a {
  text-decoration: none;
  font-weight: 500;
  color: #42b983;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #e0f5ec;
}
</style>

<script>
export default {
  data() {
    return {
      jobs: [
      ]
    }
  },

  mounted(){
    fetch('http://localhost:3030/jobs')
      .then((res)=> res.json())
      .then(data=>this.jobs=data)
      .catch(err=>console.log(err.message));
  }
}
</script>

<template>
  <div class="jobs-container">
    <h1 class="heading">Jobs Title are:</h1>

    <div v-if="jobs.length">
      <div
      class="job-card"
      v-for="job in jobs"
      :key="job.id"
    >
      <RouterLink :to="{name:'JobDetails' , params:{id:job.id}}">
        <h2>{{ job.title }}</h2>
      </RouterLink>
      
     </div>
   </div>

   <div v-else>
    <p>loading....</p>
   </div>

  </div>

</template>

<style scoped>
.jobs-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.heading {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.job-card {
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.job-card h2 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  color: #34495e;
}

.job-card p {
  margin: 0;
  color: #666;
}
</style>

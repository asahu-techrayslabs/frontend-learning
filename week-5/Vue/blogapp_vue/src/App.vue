<script>
import { computed, ref, watch, watchEffect } from 'vue';

 export default{
  setup(){
    const search=ref('');
    const names=ref(['mario','abhya','rohitya','samya','somya'])

    const stopwatch=watch(search,()=>{
     console.log("watch function ran")
    })
    const stopwatcheffect=watchEffect(()=>{
     console.log("watch effect function ran",search.value)
    })
    const matchingName=computed(()=>{
      return names.value.filter((name)=>name.includes(search.value));
    })
    function handelsubmit(){
      stopwatch();
      stopwatcheffect();
    }
    

    return {names,search,matchingName,handelsubmit}
  }
 }

</script>

<template>
   <div class="home">
      home
    </div>
    <input type="text" v-model="search"/>
    <p>search term-{{ search }}</p>
    <button @click="handelsubmit">stop watch</button>
    <div v-for="name in matchingName" :key="name">{{ name }}</div>
</template>

<style scoped>

</style>

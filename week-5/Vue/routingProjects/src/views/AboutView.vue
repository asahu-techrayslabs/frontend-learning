<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style scoped>
.about {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  text-align: center;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>

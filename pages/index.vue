<template>
  <h1>Index</h1>
  <p>{{ message }}</p>
</template>

<script setup lang="ts">
  const { message } = await $fetch('/api/hello');
</script>

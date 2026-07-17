<template>
  <div>
    post: {{ $route.params.slug }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

console.log(route.params.slug);
</script>

<template>
    <p>{{ props.error }}</p>
</template>
 
<script setup lang="ts">
    const props = defineProps({
        error:Object,  
    })
</script>

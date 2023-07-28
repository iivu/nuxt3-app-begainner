<template>
  <div>
    <div class="flex mb-3">
      <span>{{ title }}</span>
      <NButton quaternary class="ml-auto"> 查看更多 </NButton>
    </div>
    <NGrid x-gap="12" :cols="4" class="mb-6">
      <NGi v-for="item in data" :key="item.id">
        <Product :data="item" :type="type" />
      </NGi>
    </NGrid>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    title: string;
    data: any[];
    type: 'course' | 'column';
  };
  const props = withDefaults(defineProps<Props>(), {
    title: '标题',
    data: () => [],
    type: 'course',
  });
</script>

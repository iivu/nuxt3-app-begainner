<script setup lang="ts">
  import type { Catalogue } from '@prisma/client';

  type Props = {
    data: Array<Catalogue>;
  };

  const props = defineProps<Props>();
</script>

<template>
  <ul class="list-none">
    <li
      v-for="(item, index) in props.data"
      :key="item.id"
      class="flex p-5 border-b cursor-pointer text-sm hover: ( !bg-gray-100) active:( !bg-gray-200)"
      @click="navigateTo(item.source, { external: true })"
    >
      <NTag :bordered="false" type="info" size="small" class="mr-3"> 第{{ index + 1 }}节 </NTag>
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

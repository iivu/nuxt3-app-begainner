<template>
  <NBreadcrumb class="mb-5">
    <NBreadcrumbItem>
      <nuxt-link to="/"> 首页 </nuxt-link>
    </NBreadcrumbItem>
    <NBreadcrumbItem>
      {{ pageTitle }}
    </NBreadcrumbItem>
  </NBreadcrumb>
  <NGrid :x-gap="20" :cols="4">
    <NGi v-for="item in data?.data.items" :key="item.id">
      <Product :data="item" :type="pageType" />
    </NGi>
  </NGrid>
  <div class="flex justify-center items-center mt-5 mb-10">
    <NPagination size="large" :item-count="data?.data.count" :page="page" :page-size="size" :on-update:page="onPageChange" />
  </div>
</template>

<script setup lang="ts">
  import { Course, Column } from '@prisma/client';

  type PageData = { ok: boolean; data: { items: Course[] | Column[]; count: number } };

  const route = useRoute();
  const page = ref(1);
  const size = ref(10);
  const pageType = route.params.type as 'course' | 'column';
  const pageTitle = pageType === 'course' ? '课程' : '专栏列';
  const dataURL = pageType === 'course' ? '/api/courses' : '/api/columns';
  useHead({ title: pageTitle });

  const onPageChange = (_page: number) => (page.value = _page);

  const { data } = await useFetch<PageData>(() => `${dataURL}?page=${page.value}&size=${size.value}`, { watch: [page] });
</script>

<template>
  <section class="rounded bg-white flex p-5 my-2">
    <NImage :src="`/${item?.cover}`" object-fit="cover" class="rounded w-[380px] h-[210px] mr-5" />
    <div class="flex flex-1 flex-col py-2">
      <div class="flex flex-col items-start">
        <div class="flex items-center">
          <span class="text-xl mr-2">{{ item?.title }}</span>
        </div>
        <p class="my-2 text-sm text-gray-400 ml-[0.1rem]">
          {{ item?.desc }}
        </p>
        <div v-if="type === 'course'">
          <span class="text-green-600 font-bold"> 🌱 {{ (item as CourseWithCatalogue)?.price }} </span>
          <span class="text-gray-500 text-xs line-through ml-2">
            {{ ((item as CourseWithCatalogue))?.oPrice }}
          </span>
        </div>
      </div>
      <div class="mt-auto">
        <NButton type="primary" @click="subscribe"> 快到碗里来 </NButton>
      </div>
    </div>
  </section>
  <NGrid :x-gap="20" class="pt-2">
    <NGridItem :span="18">
      <section class="bg-white shadow-white mb-5 rounded">
        <Tabs :data="tabs" :state="currentTab" @change="currentTab = $event" />
        <div v-if="currentTab === 'detail'" class="pt-4 pb-10 px-10 content" v-html="detail" />
        <Catalogue v-else :data="(item as CourseWithCatalogue)?.catalogue" />
      </section>
    </NGridItem>
    <NGridItem :span="6">
      <section class="bg-white shawdow rounded mb-5">
        <div class="p-3 border-b">
          <h4>精品推荐</h4>
        </div>
        <div class="p-3">
          <Product v-for="prod in data?.data.recommend" :key="prod.id" :data="prod" :type="type" />
        </div>
      </section>
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
  import { Course, Column, Catalogue as CatalogueType } from '@prisma/client';

  type CourseWithCatalogue = Course & { catalogue: CatalogueType[] };
  type PageData = { ok: boolean; data: { item: CourseWithCatalogue | Column; recommend: (Course | Column)[] } };

  const route = useRoute();
  const tabs = ref([{ label: '详情', value: 'detail' }]);
  const currentTab = ref('detail');
  const { id, type } = route.params;

  const { data } = useFetch<PageData>(`/api/${type}/${id}`);

  const item = computed(() => data.value?.data.item);

  const detail = computed(() => {
    if (!item.value) return '';
    if (type === 'course') {
      return (item.value as CourseWithCatalogue).detail;
    }
    return (item.value as Column)?.content;
  });

  if (type === 'course') {
    tabs.value.push({ label: '目录', value: 'catalogue' });
  }

  function subscribe() {
    navigateTo(`/createorder?id=${id}`);
  }

  useHead({ title: data.value?.data.item.title || '详情' });
</script>

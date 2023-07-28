<template>
  <div class="min-w-[1024px] bg-gray-100 flex flex-col min-h-screen">
    <AppHeader />
    <main class="container m-auto mt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
  import { useUser } from '~/store/useUser';

  onMounted(async () => {
    const store = useUser();
    const { ok, data } = await useGetRequest<{ ok: boolean; data: any }>('/api/userinfo');
    if (ok) {
      store.value.userInfo = data;
    }
  });
</script>

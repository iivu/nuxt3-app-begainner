<template>
  <div class="bg-white fixed top-0 left-0 right-0 shadow-sm z-1000">
    <div class="container m-auto flex items-center h-[60px] px-4">
      <NButton text strong class="text-xl" @click="navigateTo('/')">iCourse</NButton>
      <div class="flex-1 flex items-center px-4">
        <Menu v-for="menu in menus" :key="menu.path" :active="route.path === menu.path" @click="navigateTo(menu.path)">
          {{ menu.label }}
        </Menu>
      </div>
      <NuxtLink to="/login" v-if="!store.userInfo">
        <NButton secondary strong>登录</NButton>
      </NuxtLink>
      <NDropdown v-else :options="options" @select="handleSelect">
        <NAvatar round size="small" :src="store.userInfo?.avatar ? store.userInfo.avatar : '/avatar.jpg'" />
      </NDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUser } from '~/store/useUser';

  const store = useUser();
  const dialog = useDialog();
  const route = useRoute();
  const menus = ref([
    { path: '/', label: '首页' },
    { path: '/list/column', label: '专栏' },
    { path: '/list/course', label: '课堂' },
  ]);
  const options = [
    { label: '用户中心', key: 'center' },
    { label: '登出', key: 'logout' },
  ];

  function handleSelect(key: (typeof options)[number]['key']) {
    switch (key) {
      case 'logout':
        dialog.warning({
          content: '确定退出登录吗？',
          positiveText: '退出',
          negativeText: '取消',
          onPositiveClick: () => useLogout(),
        });
        break;
      case 'center':
        navigateTo('/usercenter');
        break;
    }
  }

</script>

<style scoped></style>

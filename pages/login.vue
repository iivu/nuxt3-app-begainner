<script setup lang="ts">
  import { useUser } from '~/store/useUser';

  import type { FormInst, FormRules } from 'naive-ui';

  useHead({
    title: '登录',
  });

  definePageMeta({
    layout: 'blank',
  });

  const formRef = ref<FormInst>();
  const rules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  const model = ref({
    username: '',
    password: '',
  });
  const store = useUser();

  function login() {
    formRef.value?.validate(async (error) => {
      if (!error) {
        try {
          const { ok, data } = await usePostRequest<{ ok: boolean; data: any }>('/api/login', model.value);
          if (ok) {
            store.value.userInfo = data;
            navigateTo('/');
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
</script>

<template>
  <h2 class="flex justify-between font-bold text-2xl mb-4">
    返回iCourse
    <nuxt-link to="/register">
      <NButton quaternary type="primary" size="tiny"> 还未入加入？ </NButton>
    </nuxt-link>
  </h2>
  <NAlert title="演示账号和密码为：test" type="info" class="mb-6" />
  <NForm ref="formRef" class="w-[340px]" size="large" :rules="rules" :model="model">
    <NFormItem :show-label="false" path="username">
      <NInput clearable placeholder="用户名" v-model:value="model.username" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput clearable placeholder="密码" type="password" v-model:value="model.password" />
    </NFormItem>
    <div>
      <NButton class="w-full" type="primary" @click="login"> 登录 </NButton>
    </div>
  </NForm>
</template>

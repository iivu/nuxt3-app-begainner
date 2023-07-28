<template>
  <h2 class="font-bold text-2xl mb-4">Welcom To iCourse</h2>
  <NForm ref="formRef" class="w-[340px]" size="large" :rules="rules" :model="model">
    <NFormItem :show-label="false" path="username"><NInput clearable placeholder="用户名" v-model:value="model.username" /></NFormItem>
    <NFormItem :show-label="false" path="password"><NInput clearable type="password" placeholder="密码" v-model:value="model.password" /></NFormItem>
    <NFormItem :show-label="false" path="repassword">
      <NInput clearable type="password" placeholder="确认密码" v-model:value="model.repassword" />
    </NFormItem>
  </NForm>
  <div>
    <NButton type="primary" class="w-full" @click="register">注册</NButton>
  </div>
  <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
    注册即同意
    <NButton quaternary type="primary" size="tiny">《服务协议》</NButton>
    和
    <NButton quaternary type="primary" size="tiny">《隐私协议》</NButton>
  </div>
</template>

<script setup lang="ts">
  import type { FormInst, FormRules } from 'naive-ui';
  
  import { useUser } from '~/store/useUser';

  definePageMeta({
    layout: 'blank',
  });

  useHead({ title: '注册' });

  const formRef = ref<FormInst>();
  const rules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    repassword: [
      { required: true, message: '请确认密码' },
      {
        validator: (rule, value, callback) => {
          if (value !== model.value.password) {
            callback(new Error('两次输入密码不一致'));
            return false;
          } else {
            callback();
            return true;
          }
        },
        trigger: ['blur', 'input'],
      },
    ],
  };
  const model = ref({
    username: '',
    password: '',
    repassword: '',
  });
  const store = useUser();

  function register() {
    formRef.value?.validate(async (error) => {
      if (!error) {
        try {
          const { ok, data } = await usePostRequest<{ ok: boolean; data: any }>('/api/register', {
            username: model.value.username,
            password: model.value.password,
          });
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

<style scoped></style>

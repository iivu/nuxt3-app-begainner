<template>
    <h2 class="font-bold text-2xl mb-4">Welcom To iCourse</h2>
    <NForm ref="formRef" class="w-[340px]" size="large">
        <NFormItem :show-label="false" path="username"><NInput clearable placeholder="用户名"/></NFormItem>
        <NFormItem :show-label="false" path="password"><NInput clearable type="password" placeholder="密码"/></NFormItem>
        <NFormItem :show-label="false" path="repassword"><NInput clearable type="password" placeholder="确认密码"/></NFormItem>
    </NForm>
    <div>
        <NButton type="primary" class="w-full">注册</NButton>
    </div>
    <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
        注册即同意
        <NButton quaternary type="primary" size="tiny">《服务协议》</NButton>
        和
        <NButton quaternary type="primary" size="tiny">《隐私协议》</NButton>
    </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
  });

  useHead({ title: '注册' })
</script>

<style scoped></style>

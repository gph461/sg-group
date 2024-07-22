<script setup lang="ts">
import { Card } from 'src/components';
import MyButtons from './demo/MyButtons.vue';
import MyDashboard1 from './demo/MyDashboard1.vue';
import MyDashboard2 from './demo/MyDashboard2.vue';
import MyForm from './demo/MyForm.vue';
import MyLogin from './demo/MyLogin.vue';
import MyRegister from './demo/MyRegister.vue';
</script>
<template>
  <div style="padding: 30px">
    <div>
      <Card
        :head-style="{ color: 'red' }"
        :body-style="{ color: 'gray', overflow: 'hidden' }"
        bordered
        title="My Components"
        subtitle="hahah"
        avatar="https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
        :active-tab-key="'form'"
        :tab-list="[
          {
            key: 'form',
            tab: MyForm,
            title: 'Form',
          },
          {
            key: 'button',
            tab: MyButtons,
            title: 'Buttons',
          },
          {
            key: 'login',
            tab: MyLogin,
            title: 'Login',
          },
          {
            key: 'register',
            tab: MyRegister,
            title: 'Register',
          },
          {
            key: 'dashboard1',
            tab: MyDashboard1,
            title: 'Dashboard with sideMenu',
          },
          {
            key: 'dashboard2',
            tab: MyDashboard2,
            title: 'Dashboard',
          },
        ]"
      />
    </div>
  </div>
  <contextHolder />
</template>

<style lang="sass" scoped>
.abc
  color: red
</style>

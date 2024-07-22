<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import {
  Notification,
  Notivue, // Applied by default
  pastelTheme,
} from 'notivue';
import { cssVariables, getTheme } from 'src/helpers';
import { onMounted } from 'vue';
import Dialogs from './components/Dialogs.vue';

onMounted(() => {
  // console.log(cssVariables.value);
  for (const [key, value] of Object.entries(cssVariables.value)) {
    // console.log(key);
    // console.log(value);
    document.body.style.setProperty(key, value || '');
  }
});
</script>

<template>
  <ConfigProvider :theme="getTheme()">
    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme" />
    </Notivue>
    <div>
      <router-view />
    </div>
    <Dialogs />
  </ConfigProvider>
</template>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Noto Sans:400,500,600,700")
@import "./styles/app"
@import "./styles/border"
@import "./styles/color"
@import "./styles/typo"

#app
  font-size: 14px
  font-family: "Noto Sans", sans-serif
</style>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  ItemType,
  Layout,
  LayoutContent,
  LayoutHeader,
  Menu,
} from 'ant-design-vue';
import { homeIcon, mailIcon, settingIcon, storeIcon } from 'src/assets/icons';
import { h, ref } from 'vue';

const collapsed = ref(false);
const menu = ref<ItemType[]>([
  {
    key: 'home',
    icon: () => h('i', { class: homeIcon }),
    label: 'Home',
    title: 'Home',
  },
  {
    key: 'mail',
    icon: () => h('i', { class: mailIcon }),
    label: 'Mail',
    title: 'Mail',
  },
  {
    key: 'store',
    icon: () => h('i', { class: storeIcon }),
    label: 'Store',
    title: 'Store',
  },
  {
    key: 'setting',
    icon: () => h('i', { class: settingIcon }),
    label: 'Setting',
    title: 'Setting',
    children: [
      {
        key: 'profile',
        label: 'Profile',
        title: 'Profile',
      },
      {
        key: 'mailsetting',
        label: 'Mail Setting',
        title: 'Mail Setting',
      },
      {
        key: 'usersetting',
        icon: () => h('i', { class: 'fa-regular fa-user' }),
        label: 'User Setting',
        title: 'User Setting',
      },
    ],
  },
]);
</script>
<template>
  <div class="dashboard">
    <Layout style="min-height: 680px">
      <LayoutHeader style="background-color: #fff">
        <Flex class="container">
          <div style="padding-right: 20px">Logo</div>
          <Menu :items="menu" mode="horizontal" style="width: 500px" />
        </Flex>
      </LayoutHeader>
      <LayoutContent style="background-color: #f5f5f5; padding: 0 16px">
        <div class="container">
          <Breadcrumb style="margin: 16px 0">
            <BreadcrumbItem>Setting</BreadcrumbItem>
            <BreadcrumbItem>Profile</BreadcrumbItem>
          </Breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            Bill is a cat.
          </div>
        </div>
      </LayoutContent>
    </Layout>
  </div>
</template>

<style scoped>
.dashboard {
  margin: -22px;
}

.container {
  max-width: 90%;
  width: 1200px;
  margin: auto;
}
</style>

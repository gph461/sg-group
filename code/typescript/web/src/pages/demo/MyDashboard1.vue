<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  ItemType,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Menu,
} from 'ant-design-vue';
import { homeIcon, mailIcon, settingIcon, storeIcon } from 'src/assets/icons';
import { PrimaryButton } from 'src/components';
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
      <LayoutSider
        :collapsed="collapsed"
        theme="light"
        style="border-inline: 1px solid rgba(5, 5, 5, 0.06)"
      >
        <div style="padding: 20px">Logo</div>
        <Menu :items="menu" style="border-inline: none" />
      </LayoutSider>
      <Layout>
        <LayoutHeader style="background-color: #fff">
          <Flex>
            <PrimaryButton
              style-type="default"
              style="margin-bottom: 16px"
              @click="
                () => {
                  collapsed = !collapsed;
                }
              "
            >
              <MenuUnfoldOutlined v-if="collapsed" />
              <MenuFoldOutlined v-else />
            </PrimaryButton>
          </Flex>
        </LayoutHeader>
        <LayoutContent style="background-color: #f5f5f5; padding: 0 16px">
          <Breadcrumb style="margin: 16px 0">
            <BreadcrumbItem>Setting</BreadcrumbItem>
            <BreadcrumbItem>Profile</BreadcrumbItem>
          </Breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            Bill is a cat.
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped>
.dashboard {
  margin: -22px;
}
</style>

<script setup lang="ts">
import {
  AreaChartOutlined,
  CustomerServiceFilled,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue';
import {
  Flex,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Menu,
} from 'ant-design-vue';
import { AppSpinner, DropdownButton } from 'src/components';
import { AppRoute } from 'src/router/routes';
import { computed, h, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
interface sideNavItem {
  key: string;
  icon?: () => ReturnType<typeof h>;
  label: string;
  children?: sideNavItem[];
}

const router = useRouter();
const route = useRoute();
const selectedKeys = computed(() => [route.name as string]);
const openKeys = ref(['sub1']);

const sideNavItems = ref<sideNavItem[]>([
  {
    key: AppRoute.Dashboard,
    icon: () => h(AreaChartOutlined),
    label: 'Dashboard',
  },
  {
    key: AppRoute.Developer,
    icon: () => h('i', { class: 'fa-regular fa-helmet-safety' }),
    label: 'Developer',
  },
  {
    key: AppRoute.Project,
    icon: () => h('i', { class: 'fa-solid fa-building' }),
    label: 'Project',
  },
  {
    key: AppRoute.Index,
    icon: () => h('i', { class: 'fa-solid fa-file-invoice' }),
    label: 'Invoice',
  },
  {
    key: AppRoute.Index,
    icon: () => h('i', { class: 'fa-solid fa-money-bills' }),
    label: 'Settlement',
  },
  {
    key: AppRoute.Index,
    icon: () => h('i', { class: 'fa-solid fa-hand-holding-dollar' }),
    label: 'Claim',
  },
  {
    key: AppRoute.Index,
    icon: () => h(CustomerServiceFilled),
    label: 'Agent',
  },
  {
    key: '',
    icon: () => h('i', { class: 'fa-solid fa-handshake' }),
    label: 'Partner',
    children: [
      {
        key: AppRoute.Index,
        icon: () => h('i', { class: 'fa-solid fa-building-columns' }),
        label: 'Banker',
      },
      {
        key: AppRoute.Index,
        icon: () => h('i', { class: 'fa-solid fa-gavel' }),
        label: 'Lawyer',
      },
    ],
  },
]);

const loading = ref(false);

/* const state = reactive({
  text: '',
  abc: {
    aa: '',
  },
  dynamic: [{ a: '' }],
}); */
</script>

<template>
  <Layout style="min-height: 100vh">
    <LayoutSider class="siderStyle" :width="250" height="100%" theme="light">
      <div style="color: black; background-color: #ffefdd; height: 200px">
        Logo
      </div>
      <Menu
        v-model:openKeys="openKeys"
        :selected-keys="selectedKeys"
        mode="inline"
        :items="sideNavItems"
        theme="light"
        @click="
          (v) => {
            router.push(v.key as AppRoute);
          }
        "
      />
    </LayoutSider>

    <Layout>
      <LayoutHeader class="headerStyle" style="background-color: white">
        <div style="margin-top: -10px; margin-right: 15px">
          <DropdownButton
            class="user-dropdown"
            :options="[
              {
                icon: () => h(LogoutOutlined),
                label: 'Logout',
                callback: () => {},
              },
            ]"
          >
            <Flex gap="small">
              <i class="fa-solid fa-circle-user fa-xl" />
              Hi, User
              <MenuOutlined />
            </Flex>
          </DropdownButton>
        </div>
      </LayoutHeader>

      <LayoutContent
        class="contentStyle"
        style="background-color: #f5f5f5; padding: 0 16px"
      >
        <!-- <Breadcrumb style="margin: 16px 0">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>xxx</BreadcrumbItem>
        </Breadcrumb> -->
        <AppSpinner :loading="loading" :glass-effect="true">
          <router-view />
        </AppSpinner>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style lang="scss">
.siderStyle {
  text-align: center;
  height: 100h-max;
  color: #ffffff;
  box-shadow: 1px 64px 4px grey;
}

.headerStyle {
  text-align: right;
  color: #fff;
  height: 64;
  box-shadow: 2px 2px 4px grey;
  padding: 10px;
}

.contentStyle {
  min-height: 100vh;
  text-align: center;
  min-height: 120;
  line-height: 120px;
  color: #fff;
  margin-top: 2px;
}

.ant-menu-item {
  text-align: left;
  gap: 25px;
}

.ant-menu-submenu-title {
  gap: 20px;
  text-align: left;
}

.ant-menu-inline {
  text-align: center;
}

.ant-menu-item:hover {
  background: #ffefdd !important;
}

.ant-menu-item-selected {
  background: none !important;
  color: #ff9d2d !important;
  border-right: 4px solid #ff9d2d !important;
  border-radius: 0 !important;
}

.ant-menu-submenu-title:hover {
  background: #ffefdd !important;
}

.ant-menu-submenu-selected > .ant-menu-submenu-title {
  color: #ff9d2d !important;
}

.fa-xl {
  line-height: normal;
}

.user-dropdown {
  background-color: white !important;
  color: #ff9d2d !important;
  border-radius: 100px;
  border: 1px solid #ff9d2d;
}
</style>

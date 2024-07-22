<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, Flex, Form, Table } from 'ant-design-vue';
import { placementType } from 'ant-design-vue/es/drawer';
import { editIcon } from 'src/assets/icons';
import { PrimaryButton, SearchInput } from 'src/components';
import { useSearch } from 'src/composable';
import { Dialog } from 'src/plugins';
import { reactive, ref } from 'vue';
import CreateDialog from './CreateDeveloperDrawer.vue';

interface filterType {
  text: string;
  value: string;
}

interface TableColumn {
  title: string;
  dataIndex: string;
  width?: string;
  sorter?: boolean;
  filters?: filterType;
}

interface Developer {
  action?: string;
  developerName: string;
  projectAmount: number;
  totalCommDistribursed: number;
  totalCommToBeDistribursed: number;
}

const loading = ref(false);
const { searchKey } = useSearch();
const formValue = reactive<{
  user: { name: string };
}>({
  user: {
    name: 'abc',
  },
});

const columns: TableColumn[] = [
  {
    title: 'Action',
    dataIndex: 'action',
    width: '10%',
  },
  {
    title: 'Developer Name',
    dataIndex: 'developerName',
    sorter: true,
    /* filters: [
      { text: 'KSL', value: 'ksl' },
      { text: 'Setia', value: 'setia' },
    ], */
    width: '22.5%',
  },
  {
    title: 'Project Amount',
    dataIndex: 'projectAmount',
    sorter: true,
    width: '22.5%',
  },
  {
    title: 'Total Comm Disbursed',
    dataIndex: 'totalCommDistribursed',
    sorter: true,
    width: '22.5%',
  },
  {
    title: 'Total Comm to be Disbursed',
    dataIndex: 'totalCommToBeDistribursed',
    sorter: true,
    width: '22.5%',
  },
];

const datas: Developer[] = [
  {
    action: '',
    developerName: 'KSL',
    projectAmount: 10,
    totalCommDistribursed: 50000,
    totalCommToBeDistribursed: 1000,
  },
  {
    action: '',
    developerName: 'Eco World',
    projectAmount: 8,
    totalCommDistribursed: 60000,
    totalCommToBeDistribursed: 500,
  },
];

async function showDrawer(position: placementType) {
  Dialog.create({
    title: 'Create Developer',
    component: CreateDialog,
    width: 800,
    bodyStyle: {},
    headerStyle: {
      borderTopLeftRadius: '25px',
      backgroundColor: '#FF9D2D',
      textAlign: 'center',
      color: '#FFF !important',
    },
    style: { borderTopLeftRadius: '25px' },
    componentProps: { title: 'test' },
    placement: position,
    async onOK(v) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log('abc');
      // console.log(v);
    },
  });
  // await new Promise((resolve) => setTimeout(resolve, 500));
}

async function showUpdateDrawer(position: placementType) {
  Dialog.create({
    title: 'Update Developer',
    component: CreateDialog,
    width: 800,
    bodyStyle: {},
    headerStyle: {
      borderTopLeftRadius: '25px',
      backgroundColor: '#FF9D2D',
      textAlign: 'center',
      color: '#FFF !important',
    },
    style: { borderTopLeftRadius: '25px' },
    componentProps: { title: 'test' },
    placement: position,
    async onOK(v) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log('abc');
      // console.log(v);
    },
  });
  // await new Promise((resolve) => setTimeout(resolve, 500));
}

function handleFinish() {
  console.log('state ', formValue);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
</script>

<template>
  <Breadcrumb style="margin: 16px 0">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Developer</BreadcrumbItem>
  </Breadcrumb>

  <div style="text-align: left">
    <p style="color: black; line-height: normal; margin: 5px">Search</p>
    <Flex justify="space-between">
      <Form :model="formValue" @finish="handleFinish">
        <SearchInput
          v-model="searchKey"
          style="margin-bottom: 12px; width: 250px"
        />
      </Form>
      <PrimaryButton
        btn-class="abc bg-fprimary-1"
        :loading="loading"
        style="line-height: normal"
        @click="showDrawer('right')"
      >
        Create Developer
      </PrimaryButton>
    </Flex>
  </div>

  <div>
    <Table :columns="columns" :data-source="datas" :loading="loading">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'action'">
          <PrimaryButton
            :icon="editIcon"
            size="small"
            style-type="text"
            placement="bottomRight"
            @click="showUpdateDrawer('right')"
          />
        </template>
        <template
          v-if="
            column.dataIndex === 'totalCommDistribursed' ||
            column.dataIndex === 'totalCommToBeDistribursed'
          "
        >
          {{ 'RM ' + numberWithCommas(text) }}
        </template>
      </template>
    </Table>
  </div>
</template>
<style lang="sass">
.ant-drawer-title
  color: white !important
</style>

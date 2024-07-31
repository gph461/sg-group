<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, Flex, Form, Table } from 'ant-design-vue';
import { placementType } from 'ant-design-vue/es/drawer';
import { editIcon } from 'src/assets/icons';
import { PrimaryButton, SearchInput } from 'src/components';
import { useSearch } from 'src/composable';
import { Dialog } from 'src/plugins';
import { reactive, ref } from 'vue';
import CreateDialog from './CreateProjectDrawer.vue';

interface filterType {
  text: string;
  value: string;
}

interface TableColumn {
  title: string;
  dataIndex: string;
  width?: string;
  sorter?: boolean;
  filters?: filterType[];
}

interface roomtyps {
  name: string;
}

interface Project {
  action?: string;
  developerName: string;
  projectName: string;
  type: roomtyps[];
  totalComm: number;
  pic: number;
  subpic: number;
  advertiser: number;
  caller: number;
  closer: number;
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
    filters: [
      { text: 'KSL', value: 'ksl' },
      { text: 'Setia', value: 'setia' },
    ],
    width: '15%',
  },
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Total Comm',
    dataIndex: 'totalComm',
    sorter: true,
  },
  {
    title: 'PIC',
    dataIndex: 'pic',
  },
  {
    title: 'Sub-PIC',
    dataIndex: 'subpic',
  },
  {
    title: 'Advertiser',
    dataIndex: 'advertiser',
  },
  {
    title: 'Caller',
    dataIndex: 'caller',
  },
  {
    title: 'Closer',
    dataIndex: 'closer',
  },
];

const datas: Project[] = [
  {
    action: '',
    developerName: 'KSL',
    projectName: 'KSL Residence 1',
    type: [{ name: '3R1B' }, { name: '2R1B' }],
    totalComm: 2025000,
    pic: 1,
    subpic: 1,
    advertiser: 1,
    caller: 1,
    closer: 1,
  },
  {
    action: '',
    developerName: 'Setia',
    projectName: 'Setia Residence 1',
    type: [{ name: '3R2B' }, { name: '2R1B' }, { name: '1R1B' }],
    totalComm: 8888888,
    pic: 1,
    subpic: 1,
    advertiser: 1,
    caller: 1,
    closer: 1,
  },
];

async function showDrawer(position: placementType) {
  Dialog.create({
    title: 'Create Project',
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
        Create Project
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
            @click="showDrawer('right')"
          />
        </template>
        <template v-if="column.dataIndex === 'totalComm'">
          {{ 'RM ' + numberWithCommas(text) }}
        </template>
        <template v-if="column.dataIndex === 'type'">
          <div id="app">
            <ul>
              <li v-for="type in text" :key="type.name">
                {{ type.name }}
              </li>
            </ul>
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>
<style lang="sass">
.ant-drawer-title
  color: white !important
</style>

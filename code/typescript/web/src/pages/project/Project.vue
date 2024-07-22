<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Form,
  Table,
  TableProps,
} from 'ant-design-vue';
import { placementType } from 'ant-design-vue/es/drawer';
import { PrimaryButton, SearchInput } from 'src/components';
import { useSearch } from 'src/composable';
import { Dialog } from 'src/plugins';
import { computed, reactive, ref } from 'vue';
import CreateDialog from './CreateProjectDrawer.vue';

const loading = ref(false);
const { searchKey } = useSearch();
const formValue = reactive<{
  user: { name: string };
}>({
  user: {
    name: 'abc',
  },
});

const columns = [
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
    width: '20%',
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
    sorter: true,
    filters: [
      { text: '1 Room', value: '1r' },
      { text: '2 Room', value: '2r' },
      { text: '3 Room', value: '3r' },
    ],
    width: '20%',
  },
  {
    title: 'Total Comm',
    dataIndex: 'totalComm',
    sorter: true,
  },
  {
    title: 'PIC',
    dataIndex: 'PIC',
    sorter: true,
  },
  {
    title: 'Sub-PIC',
    dataIndex: 'SubPIC',
    sorter: true,
  },
  {
    title: 'Advertiser',
    dataIndex: 'advertiser',
    sorter: true,
  },
  {
    title: 'Caller',
    dataIndex: 'caller',
    sorter: true,
  },
  {
    title: 'Closer',
    dataIndex: 'closer',
    sorter: true,
  },
];

const datas = [
  {
    key: '1',
    action: '',
    developerName: 'KSL',
    projectName: 'KSL Residence 1',
    type: '1 Room',
    totalComm: 'RM 10,000',
    PIC: '1%',
    SubPIC: '1%',
    advertiser: '1%',
    caller: '1%',
    closer: '1%',
  },
];

const {
  data: data = datas,
  run,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: (res) => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any
) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

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

function handleFinish() {
  console.log('state ', formValue);
}
</script>

<template>
  <Breadcrumb style="margin: 16px 0">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Project</BreadcrumbItem>
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
    <Table
      :columns="columns"
      :row-key="(record) => record.login.uuid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          {{ text.first }} {{ text.last }}
        </template>
      </template>
    </Table>
  </div>
</template>
<style lang="sass">
.ant-drawer-title
  color: white !important
</style>

<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import { PrimaryButton } from 'src/components';
import { useLoading } from 'src/composable';
import { Dialog } from 'src/plugins';
import DefDialog from './DefDialog.vue';

defineProps({
  title: {
    type: String,
    default: 'Custom Modal',
  },
  abc: {
    type: String,
    default: 'Custom Modal',
  },
});

const { loading, run, toast } = useLoading();

function showCustomConfirm() {
  Dialog.create({
    component: DefDialog,
    componentProps: { title: 'def test' },
    onOK: (v: number) => {
      console.log('def');
      console.log(v);
    },
  });
}

function handleEmit() {
  toast(
    async () => {
      console.log(loading.value);
      await Dialog.emit('submit');
      console.log('hi');
      console.log(loading.value);
    },
    { isLoading: loading }
  );
}
</script>

<template>
  <Flex vertical justify="space-between" style="height: 100%">
    <div>
      <div>abc</div>
      <div>{{ title }}</div>
    </div>

    <Flex gap="small">
      <PrimaryButton btn-class="abc" @click="showCustomConfirm">
        show 2nd DIalog</PrimaryButton
      >
      <PrimaryButton btn-class="abc" :loading="loading" @click="handleEmit">
        submit</PrimaryButton
      >
      <PrimaryButton btn-class="abc" @click="Dialog.cancel">
        cancel
      </PrimaryButton>
    </Flex>
  </Flex>
</template>

<style scoped>
.custom-footer {
  text-align: right;
}
</style>

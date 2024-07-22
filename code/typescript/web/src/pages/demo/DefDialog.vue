<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import { PrimaryButton } from 'src/components';
import { Dialog } from 'src/plugins';

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
</script>

<template>
  <div>def</div>
  <div>{{ title }}</div>
  <Flex justify="end" align="center" gap="small">
    <PrimaryButton btn-class="abc" @click="Dialog.emit(200)">
      submit</PrimaryButton
    >
    <PrimaryButton btn-class="abc" @click="Dialog.cancel">
      cancel
    </PrimaryButton>
    aaa
  </Flex>
</template>

<style scoped>
.custom-footer {
  text-align: right;
}
</style>

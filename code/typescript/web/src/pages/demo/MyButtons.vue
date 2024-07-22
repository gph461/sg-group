<script setup lang="ts">
import { Flex, TypographyTitle } from 'ant-design-vue';
import { placementType } from 'ant-design-vue/es/drawer';
import { addIcon, sendIcon } from 'src/assets/icons';
import { PrimaryButton } from 'src/components';
import DropdownButton from 'src/components/buttons/DropdownButton.vue';
import { Dialog, notify } from 'src/plugins';
import { ref } from 'vue';
import AbcDialog from './AbcDialog.vue';

const loading = ref(false);

async function showCustomConfirm() {
  Dialog.create({
    title: 'Abc',
    component: AbcDialog,
    componentProps: { title: 'test' },
    async onOK(v) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log('abc');
      // console.log(v);
    },
  });
  // await new Promise((resolve) => setTimeout(resolve, 500));
}
async function showDrawer(position: placementType) {
  Dialog.create({
    title: 'Abc',
    component: AbcDialog,
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

async function showWarningDialog() {
  Dialog.warningConfirmation({
    title: 'Delete',
    buttonText: 'Confirm',
    async onOK() {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log('happy');
      console.log('happy3');
    },
  });
}
</script>
<template>
  <Flex gap="small" vertical>
    <TypographyTitle :level="5">Dialog</TypographyTitle>
    <Flex gap="small">
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showCustomConfirm"
      >
        Show Custom Dialog
      </PrimaryButton>

      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showWarningDialog"
      >
        Show Warning Dialog
      </PrimaryButton>
    </Flex>

    <TypographyTitle :level="5">Toast</TypographyTitle>
    <Flex gap="small">
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        style-type="default"
        @click="notify.success('success')"
      >
        Show Success Toast
      </PrimaryButton>

      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        style-type="default"
        @click="notify.error('error')"
      >
        Show Error Toast
      </PrimaryButton>

      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        bordered
        style-type="default"
        @click="notify.warning('warning')"
      >
        Show Warning Toast
      </PrimaryButton>

      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        style-type="default"
        @click="notify.info('info')"
      >
        Show Info Toast
      </PrimaryButton>
    </Flex>
    <TypographyTitle :level="5">Drawer</TypographyTitle>
    <Flex gap="small">
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showDrawer('left')"
      >
        Show Left Drawer
      </PrimaryButton>
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showDrawer('right')"
      >
        Show Right Drawer
      </PrimaryButton>
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showDrawer('top')"
      >
        Show Top
      </PrimaryButton>
      <PrimaryButton
        btn-class="abc"
        :loading="loading"
        @click="showDrawer('bottom')"
      >
        Show Bottom Drawer
      </PrimaryButton>
    </Flex>
    <TypographyTitle :level="5">Dropdown Button</TypographyTitle>
    <DropdownButton
      label="Menu"
      placement="bottomLeft"
      :options="[
        {
          label: 'Show Employee',
          icon: addIcon,
          callback: async () => {
            console.log('abc');
          },
        },
        {
          label: 'Show Hirer',
          icon: sendIcon,
          callback: async () => {
            console.log('cde');
          },
        },
      ]"
    />
  </Flex>
</template>

<style scoped></style>

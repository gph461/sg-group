<script setup lang="ts">
import { Drawer, Modal } from 'ant-design-vue';
import { Dialog } from 'src/plugins';
import { useDialogStore } from 'src/stores/dialog';

const dialogStore = useDialogStore();
</script>

<template>
  <div v-for="modal in dialogStore.dialogs" :key="modal.id">
    <Modal
      v-if="modal.placement === 'center'"
      :open="modal.show"
      :body-style="modal.bodyStyle"
      :centered="true"
      :footer="null"
      :title="modal.title"
      :width="modal.width"
      @cancel="Dialog.cancel()"
    >
      <component :is="modal.component" v-bind="modal.componentProps" />
    </Modal>
    <Drawer
      v-else
      :open="modal.show"
      :placement="modal.placement"
      :body-style="modal.bodyStyle"
      :style="modal.style"
      :header-style="modal.headerStyle"
      :footer="null"
      :height="modal.height"
      :title="modal.title"
      :width="modal.width"
      @close="Dialog.cancel()"
    >
      <component :is="modal.component" v-bind="modal.componentProps" />
    </Drawer>
  </div>
</template>

<style lang="sass">
// .ant-drawer-header-title
//   flex-direction: row-reverse

// .ant-drawer-content-wrapper
//   width:100% !important
</style>

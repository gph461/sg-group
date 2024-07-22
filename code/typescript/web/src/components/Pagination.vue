<script setup lang="ts">
import { Pagination } from 'ant-design-vue';

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalRecord: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 0,
  },
  simpleMode: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', page: number): void;
}>();
</script>

<template>
  <div class="pagination">
    <slot name="before" />
    <Pagination
      :current="modelValue"
      :total="totalRecord"
      :page-size="pageSize"
      :show-quick-jumper="showInput"
      :disabled="disabled"
      :simple="simpleMode"
      @update:current="(v) => emits('update:model-value', v)"
    />
    <slot name="after">
      <div v-if="totalRecord || totalRecord === 0" class="t-system">
        Total {{ totalRecord }} records
      </div>
    </slot>
  </div>
</template>

<style lang="sass" scope>
.pagination
  padding: 10px 0
  width: 100%
  display: flex
  align-items: center
  justify-content: end
</style>

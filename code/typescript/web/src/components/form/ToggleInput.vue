<script setup lang="ts">
import { Switch } from 'ant-design-vue';
import { FormItem } from 'ant-design-vue/es/form';
import { PropType } from 'vue';
import { formItemProps } from './input';
defineProps({
  ...formItemProps,
  checked: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small' | 'default'>,
    default: 'default',
  },
});

defineEmits<{
  (event: 'update:checked', v: boolean): void;
}>();
</script>

<template>
  <FormItem
    :label="label"
    :name="name"
    :required="required"
    :colon="colon"
    :label-align="labelAlign"
    :label-col="labelCol"
    :tooltip="tooltip"
    style="font-weight: bold"
  >
    <Switch
      :disabled="disabled"
      :checked="checked"
      @update:checked="(v) => {console.log(v);$emit('update:checked', v as boolean);}"
    />
  </FormItem>
</template>

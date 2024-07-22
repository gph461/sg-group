<script setup lang="ts">
import { FormItem, InputPassword } from 'ant-design-vue';
import { RuleObject } from 'ant-design-vue/es/form';
import { formItemProps, inputProps } from './input';

const props = defineProps({
  ...inputProps,
  ...formItemProps,
  visibilityToggle: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  (event: 'update:model-value', phone: string): void;
}>();

const inputRules: RuleObject[] = [
  ...(props.required
    ? [
        {
          required: true,
          message: 'Required',
        },
      ]
    : []),
  ...props.rules,
];
</script>

<template>
  <FormItem
    :label="label || 'Password'"
    :name="name"
    :rules="inputRules"
    :required="required"
    :colon="colon"
    :label-align="labelAlign"
    :label-col="labelCol"
    :tooltip="tooltip"
  >
    <InputPassword
      :value="modelValue"
      :default-value="initialValue"
      :allow-clear="allowClear"
      :bordered="bordered"
      :clear-icon="clearIcon"
      :placeholder="placeholder || 'Please enter your password'"
      :maxlength="maxLength"
      :prefix="prefix"
      :size="size"
      :disabled="disabled"
      :visibility-toggle="visibilityToggle"
      @update:value="(v) => emit('update:model-value', v)"
    />
  </FormItem>
</template>

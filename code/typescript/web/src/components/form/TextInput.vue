<script setup lang="ts">
import { Input, InputGroup, InputNumber } from 'ant-design-vue';
import { FormItem, RuleObject } from 'ant-design-vue/es/form';
import { InputRef } from 'ant-design-vue/es/vc-input/inputProps';
import { PropType, onMounted, ref } from 'vue';
import { formItemProps, inputProps, numberProps } from './input';

const props = defineProps({
  ...inputProps,
  ...formItemProps,
  ...numberProps,
  type: {
    type: String as PropType<'text' | 'number' | 'url' | 'hidden' | 'email'>,
    default: 'text',
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: any): void;
  (event: 'focus'): void;
}>();

const inputRef = ref<InputRef>();

const inputRules: RuleObject[] = [
  ...(props.type === 'email'
    ? ([
        { type: 'email', message: 'Invalid email format', trigger: 'change' },
      ] as RuleObject[])
    : []),
  ...(props.type === 'url'
    ? ([{ type: 'url', message: 'Invalid url format' }] as RuleObject[])
    : []),
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

function input(v: number | string) {
  emits('update:model-value', v);
}

onMounted(() => {
  if (props.autoFocus) inputRef.value?.focus();
});
</script>

<template>
  <FormItem
    :label="label"
    :name="name"
    :rules="inputRules"
    :required="required"
    :colon="colon"
    :label-align="labelAlign"
    :label-col="labelCol"
    :tooltip="tooltip"
  >
    <InputGroup compact>
      <InputNumber
        v-if="type === 'number'"
        ref="inputRef"
        :value="modelValue"
        :default-value="initialValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :controls="controls"
        :formatter="formatter"
        :max="number?.max"
        :min="number?.min"
        :parser="parse"
        :prefix="prefix"
        :placeholder="placeholder"
        :precision="precision"
        :size="size"
        :step="number?.step"
        :string-mode="stringMode"
        :disabled="disabled"
        @update:value="input"
      />
      <Input
        v-else
        ref="inputRef"
        :value="modelValue"
        :default-value="initialValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :prefix="prefix"
        :size="size"
        :type="type"
        :disabled="disabled"
        @update:value="input"
      />
      <slot />
    </InputGroup>
  </FormItem>
</template>
<style lang="sass"></style>

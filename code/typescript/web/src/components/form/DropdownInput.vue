<script setup lang="ts">
import { Cascader, FormItem, Select } from 'ant-design-vue';
import { CascaderOptionType } from 'ant-design-vue/es/cascader';
import { RuleObject } from 'ant-design-vue/es/form';
import { SelectProps, SelectValue } from 'ant-design-vue/es/select';
import { ValueType } from 'ant-design-vue/es/vc-cascader/Cascader';
import { CSSProperties, PropType, computed, useSlots } from 'vue';
import { formItemProps } from './input';

const props = defineProps({
  ...formItemProps,
  modelValue: {
    type: null as unknown as PropType<SelectValue | ValueType>,
    required: true,
  },
  options: {
    type: Array as PropType<SelectProps['options'] | CascaderOptionType[]>,
    required: true,
  },
  required: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  popupClassName: {
    type: String,
    default: undefined,
  },
  dropdownStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  mode: {
    type: String as PropType<'multiple' | 'tags'>,
    default: undefined,
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
  maxTagCount: {
    type: Number,
    default: undefined,
  },
  validate: {
    type: Object as PropType<{
      min?: number | undefined;
      max?: number | undefined;
      exact?: number | undefined;
    }>,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  placement: {
    type: String as PropType<
      'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
    >,
    default: 'bottomLeft',
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', v: SelectValue | ValueType): void;
  (event: 'update:blur', v: string | null): void;
}>();

const slots = useSlots();
const isOptionSlot = computed(() => slots['option']);
const isTagRenderSlot = computed(() => slots['tagRender']);
const isCascader = computed(() => {
  return (
    props.options &&
    props.options.length > 0 &&
    props.options[0].value != '' &&
    'children' in props.options[0]
  );
});

const inputRules: RuleObject[] = [
  ...(props.required
    ? [
        {
          required: true,
          message: 'Required',
        },
      ]
    : []),
  ...(props.validate && props.validate.exact
    ? ([
        {
          message: `Please select exactly ${props.validate.exact} item`,
          type: 'array',
          min: props.validate?.exact,
          max: props.validate?.exact,
          trigger: 'blur',
        },
      ] as RuleObject[])
    : []),
  ...(props.validate && props.validate.min
    ? ([
        {
          message: `Please select at least ${props.validate.min} item`,
          type: 'array',
          min: props.validate?.min,
          trigger: 'blur',
        },
      ] as RuleObject[])
    : []),
  ...(props.validate && props.validate.max
    ? ([
        {
          message: `Please select not more than ${props.validate.min} item`,
          type: 'array',
          max: props.validate?.max,
          trigger: 'blur',
        },
      ] as RuleObject[])
    : []),
  ...props.rules,
];

const filterOption = (input: string, option: any) => {
  return (
    (option.value &&
      option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
    (option.options &&
      option.options.some((i) => filterOption(input, option.options)))
  );
};
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
    <Cascader
      v-if="isCascader"
      :value="(modelValue as ValueType)"
      :options="(options as CascaderOptionType[])"
      :allow-clear="allowClear"
      :bordered="bordered"
      :disabled="disabled"
      :dropdown-style="dropdownStyle"
      :multiple="mode === 'multiple'"
      :max-tag-count="maxTagCount"
      :placeholder="placeholder"
      :placement="placement"
      :popup-class-name="popupClassName"
      :show-search="showSearch"
      @update:value="(v) => emits('update:model-value', v)"
    >
      <template v-if="isTagRenderSlot" #tagRender="tagRender">
        <slot name="tagRender" v-bind="tagRender" />
      </template>
    </Cascader>
    <Select
      v-else
      :value="(modelValue as SelectValue)"
      :options="(options as SelectProps['options'])"
      :filter-option="filterOption"
      :allow-clear="allowClear"
      :bordered="bordered"
      :disabled="disabled"
      :dropdown-style="dropdownStyle"
      :mode="mode"
      :max-tag-count="maxTagCount"
      :placeholder="placeholder"
      :placement="placement"
      :popup-class-name="popupClassName"
      :show-search="showSearch"
      @update:value="(v) => emits('update:model-value', v)"
    >
      <slot />
      <template v-if="isOptionSlot" #option="option">
        <slot name="option" v-bind="option" />
      </template>
      <template v-if="isTagRenderSlot" #tagRender="tagRender">
        <slot name="tagRender" v-bind="tagRender" />
      </template>
    </Select>
  </FormItem>
</template>

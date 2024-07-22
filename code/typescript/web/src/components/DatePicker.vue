<script setup lang="ts">
import { DatePicker, FormItem, RangePicker } from 'ant-design-vue';
import { SizeType } from 'ant-design-vue/es/config-provider';
import { RuleObject } from 'ant-design-vue/es/form';
import {
  CustomFormat,
  PickerMode,
  PresetDate,
} from 'ant-design-vue/es/vc-picker/interface';
import { SharedTimeProps } from 'ant-design-vue/es/vc-picker/panels/TimePanel';
import { Dayjs } from 'dayjs';
import { CSSProperties, PropType, computed, useSlots } from 'vue';
import { formItemProps } from './form/input';

const props = defineProps({
  ...formItemProps,
  modelValue: {
    type: [String, Object, Array] as PropType<
      string | Dayjs | [string, string] | [Dayjs, Dayjs]
    >,
    required: true,
  },
  picker: {
    type: String as PropType<PickerMode>,
    default: undefined,
  },
  type: {
    type: String as PropType<'date' | 'date-range'>,
    default: 'date',
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  dateFormat: {
    type: String as PropType<string | CustomFormat<Dayjs>>,
    default: undefined,
  },
  disabledDate: {
    type: Function as PropType<(v: Dayjs) => boolean>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showTime: {
    type: Object as PropType<SharedTimeProps<Dayjs>>,
    default: undefined,
  },
  size: {
    type: String as PropType<SizeType>,
    default: 'middle',
  },
  placeholder: {
    type: [String, Array] as PropType<string | [string, string]>,
    default: undefined,
  },
  placement: {
    type: String as PropType<
      'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
    >,
    default: 'bottomLeft',
  },
  popupStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  presets: {
    type: Array as PropType<PresetDate<Dayjs>[]>,
    default: () => [],
  },
  valueFormat: {
    type: String,
    default: undefined,
  },
});

const slots = useSlots();
const isDateRender = computed(() => slots['dateRender']);

const inputRules: RuleObject[] = [
  ...(props.required
    ? [
        {
          required: true,
          message: 'Required',
        },
      ]
    : []),
  ...(props.required && props.type === 'date-range'
    ? [
        {
          required: true,
          validator: (_rule, value: [string, string] | [Dayjs, Dayjs]) => {
            if (value[0] && value[1]) {
              return Promise.resolve();
            }

            return Promise.reject('Required');
          },
          message: 'Required',
        },
      ]
    : []),
  ...props.rules,
];

const emit = defineEmits<{
  (event: 'update:model-value', value: string | Dayjs);
}>();
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
    <DatePicker
      v-if="type === 'date'"
      :value="(modelValue as string|Dayjs)"
      :picker="picker"
      :allow-clear="allowClear"
      :bordered="bordered"
      :format="dateFormat"
      :placement="placement"
      :placeholder="(placeholder as string)"
      :pop-up-style="popupStyle"
      :presets="presets"
      :show-time="showTime"
      :size="size"
      :value-format="valueFormat"
      :disabled="disabled"
      :disabled-date="disabledDate"
      @update:value="(v) => emit('update:model-value', v)"
    >
      <template v-if="isDateRender" #dateRender="dateRender">
        <slot name="dateRender" v-bind="dateRender" />
      </template>
    </DatePicker>
    <RangePicker
      v-else
      :value="(modelValue as [string,string]|[Dayjs,Dayjs])"
      :picker="picker"
      :allow-clear="allowClear"
      :bordered="bordered"
      :format="dateFormat"
      :placement="placement"
      :placeholder="placeholder"
      :pop-up-style="popupStyle"
      :presets="presets"
      :show-time="showTime"
      :size="size"
      :value-format="valueFormat"
      :disabled="disabled"
      :disabled-date="disabledDate"
      @update:value="(v) => emit('update:model-value', v)"
    >
      <template v-if="isDateRender" #dateRender="dateRender">
        <slot name="dateRender" v-bind="dateRender" />
      </template>
    </RangePicker>
  </FormItem>
</template>
<style></style>

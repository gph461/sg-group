import { SizeType } from 'ant-design-vue/es/config-provider';
import {
  FormLabelAlign,
  NamePath,
  RuleObject,
} from 'ant-design-vue/es/form/interface';
import { ColSize } from 'ant-design-vue/es/grid';
import { CSSProperties, Component, PropType, VNode } from 'vue';

interface LabelCol {
  span: number;
  offset: number;
  flex: number | string;
  order: number;
  pull: number;
  push: number;
  xs: ColSize;
  sm: ColSize;
  md: ColSize;
  lg: ColSize;
  xl: ColSize;
  xxl: ColSize;
}

export const inputProps = {
  modelValue: {
    type: [String, Number, undefined] as PropType<string | number | undefined>,
    required: true,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: [Object, String] as PropType<VNode | Component | string>,
  },
  initialValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<SizeType>,
  },
  placeholder: {
    type: String,
  },
  inputStyle: {
    type: Object as PropType<CSSProperties>,
  },
  maxLength: {
    type: Number,
  },
  prefix: {
    type: [Object, String] as PropType<VNode | Component | string>,
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
};

export const numberProps = {
  number: {
    type: Object as PropType<{
      step?: number;
      min?: number;
      max?: number;
    }>,
    default: undefined,
  },
  controls: {
    type: Boolean,
    default: false,
  },
  stringMode: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function as PropType<
      (
        value: string | number,
        info: { userTyping: boolean; input: string }
      ) => string
    >,
  },
  parse: {
    type: Function as PropType<(displayValue: string) => string>,
  },
  precision: {
    type: Number,
  },
};

export const formItemProps = {
  label: {
    type: String,
  },
  name: {
    type: [String, Number, Array] as PropType<NamePath>,
    requried: true,
  },
  colon: {
    type: Boolean,
    default: false,
  },
  labelAlign: {
    type: String as PropType<FormLabelAlign>,
    default: 'left',
  },
  labelCol: {
    type: Object as PropType<Partial<LabelCol>>,
    default: () => ({ span: 24, offset: 0 }),
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as PropType<RuleObject[]>,
    default: () => [],
  },
  tooltip: {
    type: String,
  },
};

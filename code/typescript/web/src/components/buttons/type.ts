import type {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from 'ant-design-vue/es/button';
import { ButtonHTMLType } from 'ant-design-vue/es/button/buttonTypes';
import type { CSSProperties, Component, VNode } from 'vue';
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export const buttonProps = {
  label: {
    type: String,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'middle',
  },
  styleType: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
  type: {
    type: String as PropType<ButtonHTMLType>,
    default: 'button',
  },
  icon: {
    type: [Object, String] as PropType<VNode | Component | string>,
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'default',
  },
  href: {
    type: [String, Object] as PropType<string | RouteLocationRaw>,
  },
  target: {
    type: String,
  },
  transparentBg: {
    type: Boolean,
    default: false,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  btnClass: {
    type: String,
    default: undefined,
  },
  styles: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  fitWidth: {
    type: Boolean,
    default: false,
  },
};

<script setup lang="ts">
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { Button, Dropdown, Flex, Menu, MenuItem } from 'ant-design-vue';
import { Align } from 'ant-design-vue/es/dropdown/props';
import {
  computed,
  h,
  useSlots,
  type CSSProperties,
  type Component,
  type PropType,
  type VNode,
} from 'vue';
import { buttonProps } from './type';

export interface DropdownOption {
  label: string;
  icon?: string | VNode | Component;
  callback: (v?: any) => Promise<void> | void;
}

defineProps({
  ...buttonProps,
  options: {
    type: Array as PropType<DropdownOption[]>,
    required: true,
  },
  placement: {
    type: String as PropType<
      | 'top'
      | 'bottom'
      | 'bottomLeft'
      | 'bottomRight'
      | 'topLeft'
      | 'topRight'
      | 'topCenter'
      | 'bottomCenter'
    >,
    default: undefined,
  },
  trigger: {
    type: Array as PropType<('click' | 'hover' | 'contextmenu')[]>,
    default: () => ['click'],
  },
  overlayClassName: {
    type: String,
    default: undefined,
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  align: {
    type: Object as PropType<Align>,
    default: undefined,
  },
  overlayArrow: {
    type: Boolean,
    default: false,
  },
});
const slots = useSlots();
const isSlot = computed(() => slots['default']);
</script>

<template>
  <Dropdown
    :align="align"
    :arrow="overlayArrow"
    :disabled="disabled"
    :overlay-class-name="overlayClassName"
    :overlay-style="overlayStyle"
    :placement="placement"
    :trigger="trigger"
  >
    <template #overlay>
      <Menu>
        <MenuItem
          v-for="(option, index) in options"
          :key="index"
          @click="option.callback"
        >
          <span v-if="option.icon">
            <i v-if="typeof option.icon === 'string'" :class="option.icon" />
            <component :is="option.icon" v-else />
          </span>
          {{ option.label }}
        </MenuItem>
      </Menu>
    </template>
    <Button
      :type="styleType"
      :block="fitWidth"
      :html-type="type"
      :loading="loading"
      :size="size"
      :shape="shape"
      :icon="icon && typeof icon !== 'string' ? h(icon) : undefined"
      :ghost="transparentBg"
      :danger="danger"
      :disabled="disabled"
      :class="btnClass"
      :style="styles"
    >
      <template v-if="icon && typeof icon === 'string'" #icon>
        <i :class="`${icon}`" style="margin-right: 5px"></i>
      </template>
      <slot v-if="isSlot" />
      <Flex v-else gap="small">
        {{ label }}
        <CaretDownOutlined v-if="!icon" />
      </Flex>
    </Button>
  </Dropdown>
</template>

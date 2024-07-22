<script setup lang="ts">
import {
  Col,
  FormItem,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
} from 'ant-design-vue';
import { RuleObject } from 'ant-design-vue/es/form';
import { RadioGroupChildOption } from 'ant-design-vue/es/radio/Group';
import {
  RadioGroupButtonStyle,
  RadioGroupOptionType,
} from 'ant-design-vue/es/radio/interface';
import { PropType, VNode, computed, useSlots, type Component } from 'vue';
import { formItemProps } from './input';

type InputType = string | number | null | unknown;

interface RadioOption extends RadioGroupChildOption {
  icon?: string | VNode | Component;
}
const props = defineProps({
  ...formItemProps,
  modelValue: {
    type: [String, Number, Object] as PropType<InputType>,
    required: true,
  },
  options: {
    type: Array as PropType<(string | number | RadioOption)[]>,
    required: true,
  },
  type: {
    type: String as PropType<RadioGroupOptionType | 'vertical'>,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonStyle: {
    type: String as PropType<RadioGroupButtonStyle>,
    default: 'outline',
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: string): void;
}>();

const slots = useSlots();
const isOptionSlot = computed(() => slots['option']);

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

const getLabel = (item: string | number | RadioOption): string => {
  if (typeof item === 'string' || typeof item === 'number') {
    return item.toString();
  } else {
    return item.label as string;
  }
};

// Helper function to get value
const getValue = (item: string | number | RadioOption): string | number => {
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  } else {
    return item.value as string | number;
  }
};
function onSelect(v: string) {
  emits('update:model-value', v);
}
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
    <RadioGroup
      :value="modelValue"
      :disabled="disabled"
      :button-style="buttonStyle"
      @update:value="onSelect"
    >
      <Row v-if="type === 'button'">
        <RadioButton
          v-for="(item, index) in options"
          :key="index"
          :value="getValue(item)"
        >
          <template #default>
            <slot :item="item">{{ getLabel(item) }}</slot>
          </template>
        </RadioButton>
      </Row>
      <Row v-else>
        <Col
          v-for="(item, index) in options"
          :key="index"
          :span="type === 'vertical' ? 24 : undefined"
        >
          <Radio :value="getValue(item)">
            <template #default>
              <slot :item="item">{{ getLabel(item) }}</slot>
            </template>
          </Radio>
        </Col>
      </Row>
    </RadioGroup>
  </FormItem>
</template>

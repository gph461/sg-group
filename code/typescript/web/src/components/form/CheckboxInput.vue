<script setup lang="ts">
import {
  Checkbox,
  CheckboxGroup,
  CheckboxOptionType,
  Col,
  FormItem,
  Row,
} from 'ant-design-vue';
import { FormItemRest, RuleObject } from 'ant-design-vue/es/form';
import { PropType, VNode, ref, watch, type Component } from 'vue';
import { formItemProps } from './input';

interface CheckboxOption extends CheckboxOptionType {
  icon?: string | VNode | Component;
}

const props = defineProps({
  ...formItemProps,
  modelValue: {
    type: Array as PropType<unknown[]>,
    required: true,
  },
  options: {
    type: Array as PropType<(string | number | CheckboxOption)[]>,
    required: true,
  },
  toggleAll: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  validate: {
    type: Object as PropType<{
      min?: number | undefined;
      max?: number | undefined;
      exact?: number | undefined;
    }>,
    default: undefined,
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: any): void;
}>();

const checkAll = ref(false);
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
          message: `Please select not more than ${props.validate.max} item`,
          type: 'array',
          max: props.validate?.max,
          trigger: 'blur',
        },
      ] as RuleObject[])
    : []),
  ...props.rules,
];

const getLabel = (item: string | number | CheckboxOption): string => {
  if (typeof item === 'string' || typeof item === 'number') {
    return item.toString();
  } else {
    return item.label as string;
  }
};

// Helper function to get value
const getValue = (
  item: string | number | CheckboxOptionType
): string | number => {
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  } else {
    return item.value as string | number;
  }
};

const onCheckAllChange = (e: any) => {
  emits(
    'update:model-value',
    e.target.checked
      ? [
          ...props.options.map((i) => {
            if (typeof i === 'string' || typeof i === 'number') {
              return i;
            } else if ('value' in i) {
              const option = i as CheckboxOptionType;
              return option.value;
            }
          }),
        ]
      : []
  );
};

watch(
  () => props.modelValue,
  () => {
    checkAll.value = props.modelValue.length === props.options.length;
  }
);
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
    <Row>
      <Col :span="vertical ? 24 : undefined">
        <FormItemRest v-if="toggleAll">
          <Checkbox
            :checked="checkAll"
            :span="vertical ? 24 : undefined"
            @change="onCheckAllChange"
          >
            All
          </Checkbox>
        </FormItemRest>
      </Col>
      <CheckboxGroup
        :value="modelValue"
        @update:value="(v) => emits('update:model-value', v)"
      >
        <Row>
          <Col
            v-for="(item, index) in props.options"
            :key="index"
            :span="vertical ? 24 : undefined"
          >
            <Checkbox :value="getValue(item)">
              <template #default>
                <slot :item="item">{{ getLabel(item) }}</slot>
              </template>
            </Checkbox>
          </Col>
        </Row>
      </CheckboxGroup>
    </Row>
  </FormItem>
</template>

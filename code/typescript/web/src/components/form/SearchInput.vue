<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
import { Input } from 'ant-design-vue';
import { PropType, h } from 'vue';
import { inputProps } from './input';

const props = defineProps({
  ...inputProps,
  placeholder: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  modelValue: {
    type: String,
    required: true,
  },
  debounceTime: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits<{
  (event: 'update:model-value', phone: string): void;
}>();

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedInput = debounce((input: string | number | null) => {
  emit('update:model-value', input?.toString() || '');
}, props.debounceTime);

function handleInput(value: string | number | null) {
  debouncedInput(value);
}
</script>

<template>
  <Input
    :value="modelValue"
    :allow-clear="allowClear"
    :bordered="bordered"
    :clear-icon="clearIcon"
    :maxlength="maxLength"
    :placeholder="placeholder ?? 'Search'"
    :prefix="prefix"
    :suffix="h(SearchOutlined)"
    :size="size"
    :disabled="disabled"
    @update:value="handleInput"
  />
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { ButtonType } from 'ant-design-vue/es/button';
import { PropType, h } from 'vue';
import { useRouter } from 'vue-router';
import { buttonProps } from './type';

const props = defineProps({
  ...buttonProps,
  styleType: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
});

const emit = defineEmits<{
  (event: 'click'): void;
}>();

const router = useRouter();

function handleClick() {
  if (props.href) {
    if (typeof props.href === 'string') window.open(props.href, '_blank');
    else router.push(props.href);
  } else emit('click');
}
</script>

<template>
  <div @click.stop="null">
    <Button
      :type="styleType"
      :block="fitWidth"
      :html-type="type"
      :loading="loading"
      :size="size"
      :shape="shape"
      :icon="icon && typeof icon !== 'string' ? h(icon) : undefined"
      :target="target"
      :ghost="transparentBg"
      :danger="danger"
      :disabled="disabled"
      :class="btnClass"
      :style="styles"
      @click="handleClick"
    >
      <template v-if="icon && typeof icon === 'string'" #icon>
        <i :class="`${icon}`"></i>
      </template>
      {{ label }}
      <slot />
    </Button>
  </div>
</template>

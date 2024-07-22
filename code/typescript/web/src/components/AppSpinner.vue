<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
import { Spin } from 'ant-design-vue';
import { SpinSize } from 'ant-design-vue/es/spin/Spin';
import { PropType, h } from 'vue';

defineProps({
  message: {
    type: String,
    default: 'Loading',
  },
  color: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<SpinSize>,
    default: 'default',
  },
  loadingHideComponent: {
    type: Boolean,
    default: false,
  },
  glassEffect: {
    type: Boolean,
    default: true,
  },
  fixedPosition: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="fit relative-position" style="border-radius: inherit">
    <div class="fit overflow-auto" style="padding: 1px 0">
      <div
        :class="{
          invisible: loadingHideComponent && loading,
          'no-pointer-events': loading,
        }"
        class="fit"
      >
        <slot />
      </div>

      <div
        v-if="loading"
        class="z-max"
        :class="{
          'glass-effect': glassEffect,
          'absolute-full': !fixedPosition,
          'fixed-full': fixedPosition,
        }"
      >
        <Spin
          :indicator="h(LoadingOutlined)"
          :tip="message"
          class="absolute-center"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>

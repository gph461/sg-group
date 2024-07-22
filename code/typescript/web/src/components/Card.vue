<script setup lang="ts">
import { Avatar, Card, CardMeta } from 'ant-design-vue';
import { CardSize } from 'ant-design-vue/es/card/Card';
import { CSSProperties, PropType, computed, ref } from 'vue';

interface Panel {
  key: string;
  tab: any;
  title?: string;
}
const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  avatar: {
    type: String,
    default: undefined,
  },
  cover: {
    type: String,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<CardSize>,
    default: 'default',
  },
  headStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  tabList: {
    type: Array as PropType<Panel[]>,
    default: undefined,
  },
  activeTabKey: {
    type: String,
    default: undefined,
  },
});

const tab = ref(props.activeTabKey || props.tabList?.[0].key || '');
const tabContent = computed(() => {
  return props.tabList?.find((i) => i.key === tab.value)?.tab;
});
</script>

<template>
  <Card
    :loading="loading"
    :hoverable="hoverable"
    :bordered="bordered"
    :size="size"
    :head-style="headStyle"
    :body-style="bodyStyle"
    :title="title"
    :active-tab-key="tab"
    :default-active-tab-key="activeTabKey"
    :tab-list="tabList?.map((i) => ({ key: i.key, tab: i.tab }))"
    @tab-change="(key) => (tab = key)"
  >
    <template v-if="cover" #cover>
      <img :src="cover" />
    </template>
    <template #actions>
      <slot name="actions" />
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
    <template #customTab="item">
      <span>
        {{ tabList?.find((i) => i.key == item.key)?.title }}
      </span>
    </template>
    <div v-if="tabList">
      <div v-if="typeof tabContent === 'string'">
        {{ tabContent }}
      </div>
      <component :is="tabContent" v-else />
    </div>
    <div v-else>
      <CardMeta v-if="subtitle" :title="subtitle" :description="description">
        <template v-if="avatar" #avatar>
          <Avatar :src="avatar" />
        </template>
      </CardMeta>
      <slot v-else />
    </div>
  </Card>
</template>

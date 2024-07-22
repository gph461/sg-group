<script setup lang="ts">
import {
  Flex,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
} from 'ant-design-vue';
import { useResponsive } from 'src/composable';

const { isMobile } = useResponsive();
</script>

<template>
  <Layout :style="{ height: '100vh', minWidth: isMobile ? 'auto' : '1200px' }">
    <LayoutHeader style="background-color: #fff">
      <Flex
        justify="space-between"
        align="center"
        :class="{
          mobile: isMobile,
          web: !isMobile,
        }"
      >
        <!-- <img src="/images/logo.png" /> -->
        Logo
      </Flex>
    </LayoutHeader>
    <LayoutContent
      :style="{ flex: 1, minHeight: isMobile ? 'auto' : '650px' }"
      class="relative-position"
      :class="{
        mobile: isMobile,
        web: !isMobile,
      }"
    >
      <div class="fit" :class="{ container: !isMobile }">
        <div v-if="!isMobile" class="absolute-center shadow" />
        <router-view />
      </div>
    </LayoutContent>
    <LayoutFooter>
      <div class="col-grow text-center">
        {{
          `Copyright © ${new Date().getFullYear()} Netseal All rights reserved.`
        }}
      </div>
    </LayoutFooter>
  </Layout>
</template>
<style scoped lang="sass">
.abc
  color:var(--ant-primary-color)
.carousel-bg
  &:before
    content: ''
    background-image: var(--bg)
    background-size: inherit
    background-repeat: no-repeat
    width: 100%
    height: 100%
    top: 0
    left: 0
    position: absolute
    filter: brightness(var(--brightness))

.container
  position: relative
  // background-color: rgba( var(--ant-primary-color)/0.43)
  padding: 24px


.shadow
  width:60%
  height: 80%
  border-radius: 100%
  background-color: color-mix(in srgb, var(--ant-primary-color), transparent 60%)
  // backdrop-filter: blur(100px)
  filter: blur(50px)
</style>

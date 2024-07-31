<script setup lang="ts">
import { Flex, Step, Steps } from 'ant-design-vue';
</script>

<template>
  <Flex style="height: 100%">
    <div>
      <Steps direction="vertical" :current="1" size="default">
        <Step title="Finished" description="Project Details" />
        <Step title="In Progress" description="Property Type" />
        <Step title="Waiting" description="Commission Details" />
      </Steps>
    </div>
    <div></div>
  </Flex>
</template>

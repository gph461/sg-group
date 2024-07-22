<script setup lang="ts">
import { Form } from 'ant-design-vue';
import { PrimaryButton, TextInput } from 'src/components';
import { useLoading } from 'src/composable';
import { Dialog } from 'src/plugins';
import { reactive } from 'vue';

const { loading, toast } = useLoading();

const formValue = reactive<{
  user: { name: string };
}>({
  user: {
    name: 'abc',
  },
});

function handleFinish() {
  console.log('state ', formValue);
}

function handleEmit() {
  toast(
    async () => {
      console.log(loading.value);
      await Dialog.emit('submit');
      console.log('hi');
      console.log(loading.value);
    },
    { isLoading: loading }
  );
}
</script>

<template>
  <div style="min-height: 100%; display: grid">
    <div>
      <Form :model="formValue" @finish="handleFinish">
        <TextInput
          v-model="formValue.user.name"
          label="Developer Name"
          required
          :name="['developer', 'name']"
        />
      </Form>
    </div>

    <div style="text-align: right; align-content: end">
      <PrimaryButton
        btn-class="abc bg-fprimary-1"
        style="align-self: flex-end"
        :loading="loading"
        @click="handleEmit"
      >
        Submit
      </PrimaryButton>
    </div>
  </div>
</template>

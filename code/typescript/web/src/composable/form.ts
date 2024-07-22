import { FormInstance } from 'ant-design-vue';
import { NamePath } from 'ant-design-vue/es/form/interface';
import { ref } from 'vue';

export default () => {
  const formRef = ref<FormInstance>();

  function resetValidation(nameList?: NamePath) {
    formRef.value?.clearValidate(nameList);
    console.log(formRef.value?.model);
  }

  async function validate(nameList?: string | NamePath[]) {
    const resp = await formRef.value?.validate(nameList);
    return resp || false;
  }

  function resetFields() {
    formRef.value?.resetFields();
  }

  function scrollToField(name: NamePath, options?: ScrollOptions) {
    formRef.value?.scrollToField(name, options);
  }

  return { formRef, validate, resetFields, resetValidation, scrollToField };
};

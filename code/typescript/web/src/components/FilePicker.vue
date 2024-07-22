<script setup lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue';
import { Button, FormItem, Upload } from 'ant-design-vue';
import { RuleObject } from 'ant-design-vue/es/form';
import {
  ShowUploadListInterface,
  UploadFile,
  UploadListType,
} from 'ant-design-vue/es/upload/interface';
import { extension } from 'mime-types';
import { notify } from 'src/plugins';
import { PropType, computed, ref } from 'vue';
import { formItemProps } from './form/input';
import { AntFileType } from './type';

const props = defineProps({
  ...formItemProps,
  fileList: {
    type: Array as PropType<AntFileType[]>,
    required: true,
  },
  extensions: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
  fileType: {
    type: String as PropType<'img' | 'file'>,
    default: undefined,
  },
  showUploadList: {
    type: [Boolean, Object] as PropType<boolean | ShowUploadListInterface>,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  maxFile: {
    type: Number,
    default: 1,
  },
  maxFileSize: {
    type: Number,
    default: 500000,
  },
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showHint: {
    type: Boolean,
    default: false,
  },
  showErrorToast: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (event: 'update:file-list', files: UploadFile<File>[]): void;
}>();

const acceptExtensions = computed(() => {
  const { extensions, fileType } = props;
  let result: string | undefined = undefined;
  if (extensions && extensions.length > 0) {
    result = extensions.join(',');
  } else if (fileType) {
    result =
      fileType === 'img'
        ? '.gif, .jpg, .jpeg, .png, .avif, .WebP'
        : '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt';
  }
  return result;
});
const hint = computed(() => `Only ${acceptExtensions.value} files are allowed`);
const acceptExtensionsArray = computed<string[]>(() => {
  return (
    acceptExtensions.value
      ?.split(',')
      .map((i) => i.replace('.', '').replace(' ', '')) || []
  );
});
const errorMessage = ref('');

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

function handleInput(v: AntFileType[]) {
  errorMessage.value = '';
  const allSize = v.reduce((sum, i) => sum + (i.size || 0), 0);
  const invalidFormat = v.some(
    (i) =>
      !i.type ||
      (i.type &&
        !acceptExtensionsArray.value.some(
          (j) => j === extension(i.type as string)
        ))
  );
  if (allSize >= props.maxFileSize * props.maxFile) {
    errorMessage.value = `File is too large, max size is ${props.maxFileSize}`;
    if (props.showErrorToast) {
      notify.error(`File is too large, max size is ${props.maxFileSize}`);
    }
  } else if (invalidFormat) {
    errorMessage.value = 'Invalid file type';
    if (props.showErrorToast) {
      notify.error('Invalid file type');
    }
  } else emits('update:file-list', v);
}
function handleRemove(file: UploadFile<AntFileType>) {
  console.log('file', file);
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
    :help="
      !showErrorToast && errorMessage != ''
        ? errorMessage
        : showHint
        ? hint
        : undefined
    "
    :validate-status="
      !showErrorToast && errorMessage != '' ? 'error' : undefined
    "
  >
    <Upload
      :file-list="fileList"
      :accept="acceptExtensions"
      :show-upload-list="showUploadList"
      :max-count="maxFile"
      :multiple="multiple"
      :before-upload="() => false"
      :list-type="listType"
      :disabled="disabled"
      @remove="handleRemove"
      @update:file-list="handleInput"
    >
      <Button>
        <UploadOutlined />
        Select File
      </Button>
    </Upload>
  </FormItem>
</template>

<style lang="sass">
.app-file-selector
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

  &.show:hover
    background: black
</style>

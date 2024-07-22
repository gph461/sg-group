<script setup lang="ts">
import { Form, FormItem, TypographyParagraph } from 'ant-design-vue';
import { CascaderOptionType } from 'ant-design-vue/es/cascader';
import { SelectProps } from 'ant-design-vue/es/vc-select';
import dayjs from 'dayjs';
import {
  Card,
  CheckboxInput,
  DatePicker,
  DropdownInput,
  FilePicker,
  Pagination,
  PasswordInput,
  PhoneInput,
  PrimaryButton,
  RadioInput,
  SearchInput,
  TextInput,
  ToggleInput,
} from 'src/components';
import { AntFileType } from 'src/components/type';
import { useSearch } from 'src/composable';
import { reactive, ref } from 'vue';
import { uuid } from '~libs/helpers';
import { PhoneParsedInput } from '../../components/form/PhoneInput.vue';

interface Sights {
  value: string;
  price: string;
  id: number;
}
const { searchKey } = useSearch();

const page = ref(1);
const areas: SelectProps['options'] = [
  {
    label: 'South',
    options: [
      { label: 'USA (美国)', value: 'usa' },
      { label: 'Japan (日本)', value: 'japan' },
      { label: 'Beijing West', value: 'beijingWest' },
    ],
  },

  { label: 'Shanghaib', value: 'shanghaib' },
];
const areas2: CascaderOptionType[] = [
  {
    label: 'North America',
    value: 'northamerica',
    children: [
      {
        label: 'USA (美国)',
        value: 'usa',
        children: [
          { label: 'New York', value: 'newyork' },
          { label: 'Sab Francisco', value: 'sanfrancisco' },
        ],
      },
    ],
  },
  {
    label: 'Asia',
    value: 'Asia',
    children: [
      {
        label: 'China',
        value: 'china',

        children: [
          { label: 'Shanghai', value: 'shanghai' },
          { label: 'Beijing', value: 'beijing' },
        ],
      },
      {
        label: 'Japan',
        value: 'japan',

        children: [
          { label: 'Tokyo', value: 'tokyo' },
          { label: 'Osaka', value: 'osaka' },
        ],
      },
    ],
  },
];
const fruits = [
  { label: 'Carrot', value: 'carrot', icon: 'fa-solid fa-carrot' },
  { label: 'Lemon', value: 'lemon', icon: 'fa-solid fa-lemon' },
  { label: 'Apple', value: 'apple', icon: 'fa-solid fa-apple-whole' },
];

const presets = ref([
  { label: 'Today', value: dayjs() },
  { label: 'Yesterday', value: dayjs().add(-1, 'd') },
  { label: 'Last Week', value: dayjs().add(-7, 'd') },
  { label: 'Last Month', value: dayjs().add(-1, 'month') },
]);

const formValue = reactive<{
  url: string;
  email: string;
  checked: boolean;
  array: { key: string; value: string }[];
  phone: PhoneParsedInput;
  area: string;
  areas: string[];
  sights: Sights[];
  fruit: string[];
  files: AntFileType[];
  date: string;
  dates: [string, string];
  radioFruit: string;
  password: string;
  user: { name: string };
}>({
  url: 'https://abc.com',
  email: 'asd@gmail.com',
  checked: false,
  area: '',
  areas: [],
  array: [],
  sights: [],
  fruit: [],
  files: [],
  phone: {
    extension: '',
    phone: '',
  },
  date: '',
  dates: ['', ''],
  radioFruit: '',
  password: '',
  user: {
    name: 'abc',
  },
});

function handleFinish() {
  console.log('state ', formValue);
}

function addField() {
  formValue.array.push({
    key: uuid(5),
    value: '',
  });
}
</script>
<template>
  <Card style="width: 1000px; max-width: 100%">
    <Form :model="formValue" @finish="handleFinish">
      <SearchInput v-model="searchKey" style="margin-bottom: 12px" />
      <TypographyParagraph class="copy-input bordered" copyable
        >Copy Test</TypographyParagraph
      >
      <FilePicker
        v-model:file-list="formValue.files"
        label="Image"
        file-type="img"
        name="files"
        required
      />
      {{ formValue.phone }}
      <PhoneInput
        v-model="formValue.phone"
        placeholder="Please enter your phone number"
        required
        label="Phone"
        name="phone"
        show-country-flag
      />
      <TextInput
        v-model="formValue.url"
        label="Url"
        type="url"
        required
        name="url"
      />
      <TextInput
        v-model="formValue.email"
        label="Email"
        type="email"
        required
        name="email"
      />
      <ToggleInput v-model:checked="formValue.checked" label="check" />
      <TextInput
        v-model="formValue.user.name"
        label="User Name"
        required
        :name="['user', 'name']"
      />

      <TextInput
        v-for="(item, index) in formValue.array"
        :key="item.key"
        v-model="item.value"
        :label="`array ${index + 1}`"
        :hide-required-mark="true"
        required
        :name="['array', index, 'value']"
      />
      <FormItem>
        <PrimaryButton
          style-type="dashed"
          fit-width
          label="add field"
          @click="addField"
        />
      </FormItem>
      <DropdownInput
        v-model="formValue.area"
        name="area"
        label="Dropdown"
        :options="areas"
        show-search
        required
      />
      <DropdownInput
        v-model="formValue.area"
        name="area"
        label="Cascader"
        :options="areas2"
        show-search
        required
      />
      <DropdownInput
        v-model="formValue.area"
        name="area"
        label="Cascader mutiple"
        mode="multiple"
        :options="areas2"
        show-search
        required
      />
      <DropdownInput
        v-model="formValue.areas"
        name="areas"
        label="Dropdown Tags with custom render tag and option (custom option)"
        :options="areas"
        mode="tags"
        show-search
        requried
        :validate="{ exact: 2 }"
      >
        <template #option="{ value: val, label }">
          <span role="img" :aria-label="val">{{ val }}</span>
          &nbsp;&nbsp;{{ label }}
        </template>
        <template #tagRender="{ value: val, label }">
          <a-tag style="margin-right: 3px">
            {{ label }}&nbsp;&nbsp;
            <span role="img" :aria-label="val">{{ val }}</span>
          </a-tag>
        </template>
      </DropdownInput>
      <DropdownInput
        v-model="formValue.areas"
        label="Dropdown Multiple "
        name="areas"
        :options="areas"
        mode="multiple"
        show-search
        allow-clear
      />
      <CheckboxInput
        v-model="formValue.fruit"
        :options="fruits"
        name="fruit"
        toggle-all
        required
        label="Fruit"
      />
      <CheckboxInput
        v-model="formValue.fruit"
        label="fruit"
        name="fruit"
        :options="fruits"
        toggle-all
      >
        <template #default="{ item }">
          <span v-if="typeof item !== 'string' && typeof item !== 'number'">
            <i :class="item.icon" /> {{ item.label }}
          </span>
        </template>
      </CheckboxInput>
      <CheckboxInput
        v-model="formValue.fruit"
        name="fruit"
        :options="fruits"
        toggle-all
        vertical
        required
        :validate="{ min: 1 }"
      >
        <template #default="{ item }">
          <span v-if="typeof item !== 'string' && typeof item !== 'number'">
            <i :class="item.icon" /> {{ item.label }}
          </span>
        </template>
      </CheckboxInput>

      <RadioInput v-model="formValue.radioFruit" :options="fruits" />
      <RadioInput
        v-model="formValue.radioFruit"
        :options="fruits"
        type="vertical"
      />
      <RadioInput
        v-model="formValue.radioFruit"
        name="radioFruit"
        :options="fruits"
        required
        type="button"
      >
        <template #default="{ item }">
          <span v-if="typeof item !== 'string' && typeof item !== 'number'">
            <i :class="item.icon" /> {{ item.label }}
          </span>
        </template>
      </RadioInput>
      <PasswordInput v-model="formValue.password" required name="password" />
      <DatePicker
        v-model="formValue.date"
        label="Date"
        name="date"
        date-format="YY-MMM-DD"
        placement="topRight"
        allow-clear
        required
        :disabled-date="(v) => v < dayjs().endOf('day')"
        :presets="presets"
        value-format="YYYY-MM-DD"
      />
      <DatePicker
        v-model="formValue.dates"
        type="date-range"
        label="Date Range"
        name="dates"
        required
        value-format="YYYY-MM-DD"
      />
      <Pagination v-model="page" :total-record="50" :page-size="20" />
      <FormItem>
        <PrimaryButton type="submit" label="submit" />
      </FormItem>
    </Form>
  </Card>
</template>

<style scoped></style>

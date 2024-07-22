<script setup lang="ts">
import {
  Carousel,
  Divider,
  Flex,
  Form,
  Typography,
  TypographyParagraph,
  TypographyTitle,
} from 'ant-design-vue';
import { PasswordInput, PrimaryButton, TextInput } from 'src/components';
import Card from 'src/components/Card.vue';
import { useLoading } from 'src/composable';
import { computed, reactive, ref } from 'vue';

interface Announcement {
  id: number;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
}

const { loading, toast } = useLoading();
const state = reactive<{
  email: string;
  password: string;
  confirmPassword: string;
}>({
  email: '',
  password: '',
  confirmPassword: '',
});
const announcements = ref<Announcement[]>([]);
const carouselContent = computed<Announcement[]>(() => buildCarouselContent());
const currentSlide = ref(carouselContent.value[0].id);
const checked = ref(false);
function buildCarouselContent(): Announcement[] {
  if (announcements.value.length > 0) {
    currentSlide.value = announcements.value[0].id;
    return announcements.value;
  } else {
    return [
      {
        id: 1,
        title: 'Welcome to Netseal',
        description: 'Power Netseal',
        imageUrl: null,
      },
      {
        id: 2,
        title: 'Powerful Team',
        description: 'Help you solve every problem',
        imageUrl: null,
      },
    ];
  }
}

function passwordValidator(_rule, value: string) {
  if (value !== '' && value === state.password) {
    return Promise.resolve();
  }
  return Promise.reject('Passwords are not the same');
}
function handleSubmit() {
  toast(
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    {
      isLoading: loading,
    }
  );
}
</script>
<template>
  <div class="login glass-effect">
    <Card
      :bordered="false"
      style="
        width: 900px;
        margin: auto;
        background-color: var(--ant-bg-elevated-color);
      "
      class="absolute-center shadow"
    >
      <Flex justify="space-between">
        <Card class="inner-card">
          <Typography>
            <TypographyTitle :level="3"> Welcome to Netseal </TypographyTitle>
            <TypographyParagraph>
              Sign up to begin your journey
            </TypographyParagraph>
          </Typography>
          <Divider />

          <Form :model="state" @finish="handleSubmit">
            <TextInput
              v-model="state.email"
              label="Email"
              type="email"
              required
              name="email"
            />
            <PasswordInput
              v-model="state.password"
              label="Password"
              name="password"
              placeholder=" "
              required
            />
            <PasswordInput
              v-model="state.confirmPassword"
              placeholder=" "
              label="Confirm Password"
              name="confirmPassword"
              :rules="[
                {
                  validator: passwordValidator,
                  trigger: 'change',
                },
              ]"
              required
            />

            <PrimaryButton
              label="Sign up"
              type="submit"
              fit-width
              :loading="loading"
              :styles="{ marginTop: '30px' }"
            />
            <Flex align="center" justify="center">
              Already has an account?
              <PrimaryButton label="Login" style-type="link" />
            </Flex>
          </Form>
        </Card>
        <Carousel style="width: 40%" autoplay dots>
          <div v-for="item in carouselContent" :key="item.id">
            <div style="height: 500px; position: relative">
              <div class="absolute-center">
                <Typography>
                  <TypographyTitle :level="4">
                    {{ item.title }}</TypographyTitle
                  >
                  <TypographyParagraph>
                    {{ item.description }}
                  </TypographyParagraph>
                </Typography>
              </div>
            </div>
          </div>
        </Carousel>
      </Flex>
    </Card>
  </div>
</template>

<style lang="sass" scoped>
.ant-card-body
    overflow: hidden

.login
    position: relative
    // background-color: rgba( var(--ant-primary-color)/0.43)
    background-color: #B6BECB
    margin:-24px
    padding: 24px
    min-height: 650px

.inner-card
  width: 60%
  margin:-24px
  padding: 24px

.shadow
    box-shadow: 0 5px 30px color-mix(in srgb, #B6BECB, transparent 70%) !important

:deep(div)
  .slick-dots
    li
      button
        background: color-mix(in srgb, var(--ant-primary-color), transparent 30%) !important
    li.slick-active
      button
        background: var(--ant-primary-color) !important
</style>

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
import { Api } from 'src/api';
import { PasswordInput, PrimaryButton, TextInput } from 'src/components';
import Card from 'src/components/Card.vue';
import { useLoading } from 'src/composable';
import { AppRoute } from 'src/router/routes';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RegisterUserDto } from '~backend/user/user.dto';

interface Announcement {
  id: number;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
}

const router = useRouter();
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
        title: 'Welcome to SG Group',
        description: 'Power Netseal',
        imageUrl: '/images/adminbackground.png',
      },
      {
        id: 2,
        title: 'Powerful Team',
        description: 'Help you solve every problem',
        imageUrl: '/images/adminbackground.png',
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
      await Api.User.createUser({
        email: state.email,
        password: state.password,
      } as RegisterUserDto);

      router.push({ name: AppRoute.Dashboard });
    },
    {
      isLoading: loading,
    }
  );
}

function Login() {
  router.push({
    name: AppRoute.Login,
  });
}
</script>
<template>
  <div style="overflow: hidden">
    <Card
      :bordered="false"
      :body-style="{
        padding: 0,
        height: '100vh',
      }"
    >
      <Flex justify="space-between">
        <Card class="inner-card">
          <Typography>
            <TypographyTitle :level="3"> Welcome to Sg Group </TypographyTitle>
            <TypographyParagraph>
              Sign up to begin your journey
            </TypographyParagraph>
            <img scr="" width="100%" height="100px" />
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

            <div style="text-align: center">
              <PrimaryButton
                label="Sign Up"
                type="submit"
                fit-width
                :loading="loading"
                :styles="{
                  marginTop: '30px',
                  width: '60%',
                  backgroundColor: '#FF9D2D',
                }"
              />
            </div>
            <Flex align="center" justify="center">
              Already has an account?
              <PrimaryButton label="Login" style-type="link" @click="Login" />
            </Flex>
          </Form>
        </Card>
        <Carousel style="width: 50%" autoplay dots>
          <div v-for="item in carouselContent" :key="item.id">
            <div
              style="height: 100vh; position: relative"
              :style="{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
              }"
            >
              <div class="absolute-center" style="overflow: hidden">
                <Typography>
                  <TypographyTitle :level="4" style="color: white">
                    {{ item.title }}
                  </TypographyTitle>
                  <TypographyParagraph style="color: white">
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

<style lang="scss" scoped>
.login {
  position: relative;
  // background-color: rgba( var(--ant-primary-color)/0.43)
  background-color: color-mix(
    in srgb,
    var(--ant-primary-color),
    transparent 66%
  );

  min-height: 650px;
}

.inner-card {
  width: 50%;
  padding: 24px;
}

.shadow {
  box-shadow: 0 5px 30px
    color-mix(in srgb, var(--ant-primary-color), transparent 70%) !important;
}

:deep(div) {
  .slick-dots {
    li {
      button {
        background: color-mix(
          in srgb,
          var(#ff9d2d),
          transparent 30%
        ) !important;
      }
      &.slick-active {
        button {
          background: var(#ff9d2d) !important;
        }
      }
    }
  }
}
</style>

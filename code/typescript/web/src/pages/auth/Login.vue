<script setup lang="ts">
import {
  Carousel,
  Checkbox,
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
import { AppRoute } from 'src/router/routes';
import { useUserStore } from 'src/stores/user';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Announcement {
  id: number;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
}

const router = useRouter();
const user = useUserStore();
const { loading, toast } = useLoading();
const state = reactive<{ email: string; password: string }>({
  email: '',
  password: '',
});
const announcements = ref<Announcement[]>([]);
const carouselContent = computed<Announcement[]>(() => buildCarouselContent());
console.log(carouselContent);
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

function handleSubmit() {
  toast(
    async () => {
      await user.login(state.email, state.password);
      if (user.currentUser) {
        router.push({ name: AppRoute.Dashboard });
      }
    },
    {
      isLoading: loading,
    }
  );
}

function signUp() {
  router.push({
    name: AppRoute.Signup,
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
        <Card
          class="inner-card"
          :body-style="{
            height: '100vh',
          }"
        >
          <Typography>
            <TypographyTitle :level="3"> Welcome to SG Group </TypographyTitle>
            <TypographyParagraph> Login to your account </TypographyParagraph>
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
              required
            />
            <Flex align="center" justify="space-between">
              <Checkbox v-model:checked="checked"> Remember me</Checkbox>
              <PrimaryButton label="Forget Password" style-type="link" />
            </Flex>
            <div style="text-align: center">
              <PrimaryButton
                label="Login"
                type="submit"
                fit-width
                :loading="loading"
                :styles="{
                  marginTop: '30px',
                  width: '350px',
                  backgroundColor: '#FF9D2D',
                }"
              />
            </div>

            <Flex align="center" justify="center">
              Don't Have An Account?
              <PrimaryButton
                label="Sign Up"
                style-type="link"
                @click="signUp"
              />
            </Flex>
          </Form>
        </Card>
        <Carousel style="width: 50%; color: white" autoplay dots>
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

<style scoped lang="scss">
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
          var(#ff9d2d) !important,
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

import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Api, ApiError } from 'src/api';
import { ref } from 'vue';
import { User } from '~libs/entities';
import { useAppStore } from './app';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage<string | null>('access-token', null),
    currentUser: ref<User | null>(null),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async refetch(): Promise<void> {
      if (!this.token) return;
      useAppStore().addLoadingQueues([{ id: 'user', isGlobal: true }]);
      try {
        this.currentUser = await Api.User.fetchUser();
      } catch (e) {
        this.token = null;
        throw e;
      } finally {
        useAppStore().resolveQueues(['user']);
      }
    },
    async login(email: string, password: string) {
      try {
        const resp = await Api.User.login({ email, password, device_ip: null });
        this.token = resp.data.token;
        await this.refetch();
        await useAppStore().resolveQueues(['user']);
      } catch (e) {
        if (e instanceof ApiError) {
          if (e.statusCode === 401) {
            throw new Error('Invalid username or password');
          }
        }
        throw e;
      }
    },
    async loginUsingToken(token: string) {
      this.token = token;
      await useAppStore().resolveQueues(['user']);
    },
    async logout() {
      try {
        await Api.User.logout();
      } finally {
        this.token = null;
        this.currentUser = null;
        window.location.reload();
      }
    },
  },
});

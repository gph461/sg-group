import { App, createApp } from 'vue';
import MainApp from './App.vue';
import Splash from './pages/Splash.vue';
import Router from './router';

// Import Fontawesome
import 'src/assets/fontawesome/css/all.css';

//Ant Design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Import pinia
import { createPinia } from 'pinia';

// Import DayJS
import dayjs, { extend } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

// Import Notivue
import { createNotivue } from 'notivue';

import 'notivue/animations.css';
import 'notivue/notification.css';

const notivue = createNotivue({
  position: 'top-right',
  limit: 8,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 5000,
    },
  },
});

// init global pinia store
const pinia = createPinia();

// create splash screen
const splash = createApp(Splash);
splash.mount('#app');

/// !!! init plugins and libraries below to mount Splash asap

// init dayjs
extend(isBetween);
extend(isSameOrBefore);
extend(updateLocale);
extend(utc);
extend(timezone);
extend(objectSupport);
extend(localizedFormat);
dayjs.updateLocale('en', {
  weekStart: 1,
});

async function init() {}

init().then(async () => {
  const app = await registerVue();
  splash.unmount();
  app.mount('#app');
});

async function registerVue(): Promise<App> {
  const app = createApp(MainApp);
  app.use(pinia);
  try {
    console.log('initApp');
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    //register ant design
    app.use(Antd);

    //register notivue
    app.use(notivue);

    // register router
    app.use(Router);
    // eslint-disable-next-line no-unsafe-finally
    return app;
  }
}

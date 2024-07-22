import { DeleteFilled, ExclamationCircleFilled } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { push } from 'notivue';
import { h } from 'vue';
import { uuid } from '~libs/helpers';
import { getTheme, randomString } from './helpers';
import { useAppStore } from './stores/app';
import { CreateDialogOpts, useDialogStore } from './stores/dialog';

interface ConfirmationData {
  title?: string;
  message?: string;
  buttonText?: string;
  validateText?: string;
  validateLabel?: string;
  onOK?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

const Dialog = {
  create(opt: Omit<CreateDialogOpts, 'id' | 'show'>) {
    return useDialogStore().addDialog({
      ...opt,
      id: uuid(6),
      placement: opt.placement ? opt.placement : 'center',
    });
  },
  async emit(v?: unknown) {
    return await useDialogStore().triggerOk(v);
  },
  cancel() {
    return useDialogStore().triggerCancel();
  },
  deleteConfirmation(v: ConfirmationData) {
    Modal.confirm({
      title: v.title,
      icon: h(DeleteFilled, {
        style: { color: getTheme().token?.colorError },
      }),
      content: v.message,
      centered: true,
      okText: v.buttonText || 'Confirm',
      okButtonProps: { danger: true },
      maskClosable: true,
      async onOk() {
        await v.onOK?.();
      },
      async onCancel() {
        await v.onCancel?.();
      },
    });
  },
  warningConfirmation(v: ConfirmationData) {
    const warningColor = getTheme().token?.colorWarning;
    Modal.confirm({
      title: v.title,
      icon: h(ExclamationCircleFilled, {
        style: { color: warningColor },
      }),
      content: v.message,
      centered: true,
      okText: v.buttonText || 'Confirm',
      maskClosable: true,
      async onOk() {
        await v.onOK?.();
      },
      async onCancel() {
        await v.onCancel?.();
      },
    });
  },
};

interface NotifyOptions {
  action?: { label: string; onClick: () => void };
  cancel?: { label: string; onClick: () => void };
  duration?: number;
  description?: string;
  style?: { color: string };
  dismissible?: boolean;
  important?: boolean;
}

const notify = {
  success(message: string, option?: NotifyOptions) {
    push.success({
      message: message,
      props: {
        action: option?.action,
        cancel: option?.cancel,
        description: option?.description,
        style: option?.style,
        dismissible: option?.dismissible || true,
        important: option?.important,
      },
      duration: option?.duration || 5000,
    });
  },
  warning(message: string, option?: NotifyOptions) {
    push.warning({
      message: message,
      props: {
        action: option?.action,
        cancel: option?.cancel,
        description: option?.description,
        style: option?.style,
        dismissible: option?.dismissible || true,
        important: option?.important,
      },
      duration: option?.duration || 5000,
    });
  },
  error(message: string, option?: NotifyOptions) {
    push.error({
      message: message,
      props: {
        action: option?.action,
        cancel: option?.cancel,
        description: option?.description,
        style: option?.style,
        dismissible: option?.dismissible || true,
        important: option?.important,
      },
      duration: option?.duration || 5000,
    });
  },
  info(message: string, option?: NotifyOptions) {
    push.info({
      message: message,
      props: {
        action: option?.action,
        cancel: option?.cancel,
        description: option?.description,
        style: option?.style,
        dismissible: option?.dismissible || true,
        important: option?.important,
      },
      duration: option?.duration || 5000,
    });
  },
};

async function toggleLoading<T>(func: () => Promise<T>): Promise<T> {
  const queueId = `${new Date().toISOString()}-${randomString(4)}`;
  const appStore = useAppStore();
  try {
    appStore.addLoadingQueues([
      {
        id: queueId,
        isGlobal: true,
      },
    ]);
    return await func();
  } catch (err) {
    if (err instanceof Error) {
      notify.error(err.message);
    } else {
      notify.error(`${err}`);
    }
    throw err;
  } finally {
    appStore.resolveQueues([queueId]);
  }
}

export { Dialog, notify, toggleLoading };

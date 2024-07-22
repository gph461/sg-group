import { defineStore } from 'pinia';
import { CSSProperties, ref, type Component } from 'vue';

type Placement = 'top' | 'left' | 'bottom' | 'right' | 'center';
export interface CreateDialogOpts<Props = any, Result = any> {
  id: string;
  show: boolean;
  title?: string | Component;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  placement?: Placement;
  width?: number;
  height?: number;
  component: any;
  componentProps?: Props;
  onOK?: (result?: Result) => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    dialogs: ref<CreateDialogOpts[]>([]),
  }),
  actions: {
    addDialog(dialog: Omit<CreateDialogOpts, 'show'>) {
      this.dialogs = [...this.dialogs, { ...dialog, show: true }];
    },
    removeDialog(dialog: CreateDialogOpts) {
      const selectedDialog = this.dialogs.find(
        (d: CreateDialogOpts) => d.id === dialog.id
      );
      if (!selectedDialog) return;
      const timer = setTimeout(() => {
        this.dialogs = this.dialogs.filter(
          (d: CreateDialogOpts) => d.id !== dialog.id
        );
        dialog.show = false;
        clearTimeout(timer);
      }, 200);
    },
    async triggerOk(result: unknown) {
      const dialog = this.dialogs
        .filter((d: CreateDialogOpts) => d.show)
        .at(-1);
      if (!dialog) return;
      // try {
      await dialog.onOK?.(result);
      this.removeDialog(dialog);
      // } catch (e) {
      //   console.log(e);
      // }
    },
    async triggerCancel() {
      const dialog = this.dialogs
        .filter((d: CreateDialogOpts) => d.show)
        .at(-1);
      if (!dialog) return;
      dialog.show = false;
      // try {
      await dialog.onCancel?.();
      this.removeDialog(dialog);
      // } catch (e) {
      //   console.log(e);
      // }
    },
  },
});

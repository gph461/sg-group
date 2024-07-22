import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { AliasToken } from 'ant-design-vue/es/theme/internal';
import { computed } from 'vue';

const theme: ThemeConfig = {
  token: {
    borderRadius: 6,
    colorBgBase: '#fff',
    colorBgLayout: '#fff',
    colorBgElevated: '#F6F6F6',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    colorPrimary: '#1976D2',
    colorSuccess: '#06C270',
    colorInfo: '#1890FF',
    colorError: '#FF3B3B',
    colorWarning: '#FAAD14',
    colorTextBase: '#11202F',
    controlHeight: 32,
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,
    lineHeight: 1.5714285714285714,
    lineHeightHeading1: 1.2105263157894737,
    lineHeightHeading2: 1.2666666666666666,
    lineHeightHeading3: 1.3333333333333333,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6666666666666667,
    lineType: 'solid',
    lineWidth: 1,
    sizePopupArrow: 12,
    zIndexBase: 0,
    zIndexPopupBase: 1000,
  },
};

export const cssVariables = computed(() => ({
  '--ant-primary-color': theme.token?.colorPrimary,
  '--ant-bg-elevated-color': theme.token?.colorBgElevated,
  '--ant-link-color': theme.token?.colorLink,
  // Map other tokens to CSS variables as needed
}));
export const getTheme = () => theme;

export const setTheme = (v: Partial<AliasToken>) => {
  theme.token = v;
};

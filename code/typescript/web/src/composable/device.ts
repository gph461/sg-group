import useBreakpoint from 'ant-design-vue/es/_util/hooks/useBreakpoint';
import { computed } from 'vue';

export function useResponsive() {
  const screen = useBreakpoint();

  const isMobile = computed(() => screen.value.xs);

  function getValue<T>(v: { mobile: T; desktop: T }): T {
    return isMobile.value ? v.mobile : v.desktop;
  }

  return {
    screen,
    isMobile,
    getValue,
    gte: computed(() => {
      return {
        xs:
          screen.value.xs ||
          screen.value.sm ||
          screen.value.md ||
          screen.value.lg ||
          screen.value.xl,
        sm: screen.value.md || screen.value.lg || screen.value.xl,
        md: screen.value.lg || screen.value.xl,
        lg: screen.value.xl,
      };
    }),
    lte: computed(() => {
      return {
        xs: screen.value.xs,
        sm: screen.value.xs || screen.value.sm,
        md: screen.value.xs || screen.value.sm || screen.value.md,
        lg:
          screen.value.xs ||
          screen.value.sm ||
          screen.value.md ||
          screen.value.lg,
      };
    }),
  };
}

export function useDevice() {
  const userAgent = navigator.userAgent;
  const isIPhone = computed(() => {
    return (
      /iPhone|iPad|iPod/.test(userAgent) || navigator.userAgent.includes('Mac')
    );
  });

  return {
    isIPhone,
  };
}

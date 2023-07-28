import { createDiscreteApi } from 'naive-ui';

export function useNMessage() {
  return createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar']);
}

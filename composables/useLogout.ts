import { useUser } from '~/store/useUser';
import { useNMessage } from '~/composables/useNMessage';

export function useLogout() {
  const route = useRoute();
  const store = useUser();
  const { message } = useNMessage();
  const token = useCookie('token');
  if (token.value) token.value = null;
  store.value.userInfo = null;

  message.success('退出登录成功');

  if (route.path !== '/') navigateTo('/');
}

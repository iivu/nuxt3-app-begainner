import _ from 'lodash';

type HttpMehotd = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FetchType = typeof $fetch;
type ReqestType = Parameters<FetchType>[0];
type FetchOptions = Parameters<FetchType>[1];

export function useRequest<T = unknown>(method: HttpMehotd, url: ReqestType, body?: any, options?: FetchOptions) {
  const token = useCookie('token');
  const router = useRouter();
  const route = useRoute();
  const { message } = useNMessage();

  const defaultOptions = {
    method,
    headers: { token: token.value },
    body,
    onRequestError() {
      message.error('请求失败');
    },
    onResponseError({ response }) {
      switch (response.status) {
        case 400:
          message.error('Invalid params');
          break;
        case 401:
          router.push(`/login?callback=${route.path}`);
          message.error('Unauthorized');
          break;
        case 403:
          message.error('Forbidden');
          break;
        case 404:
          message.error('Not found');
          break;
        case 500:
          message.error('Internal server error');
          break;
        default:
          message.error('Unknown error');
          break;
      }
    },
  } as FetchOptions;
  return $fetch<T>(url, _.merge(defaultOptions, options));
}

export function usePostRequest<T = unknown>(request: ReqestType, body?: any, options?: FetchOptions) {
  return useRequest<T>('POST', request, body, options);
}

export function useGetRequest<T = unknown>(request: ReqestType, options?: FetchOptions) {
  return useRequest<T>('GET', request, null, options);
}

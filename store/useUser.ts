type State = {
  userInfo: null | { nickname: string ; avatar: string };
}

export const useUser = () => useState<State>('user', () => ({
  userInfo: null,
}));

import { getProfile } from '@/services/clients/user.client.service';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  });
  const user = data?.data.user;
  const queryClient = new QueryClient();
  const refreshUser = () => queryClient.setQueryData(['user'], user);
  const clearUser = () => queryClient.setQueryData(['user'], null);
  return { user, refreshUser, clearUser };
};

'use client';
import { SearchParams, User } from '@/types/common';
import UserCard from './components/userCard';
import Pagination from '@/components/UI/paginate';
import SearchBar from '../../../components/UI/srearchParam';
import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '@/services/clients/user.client.service';
import { getSearchParams } from '@/helpers/common';
import UserAction from './components/UserAction';
import Loading from '@/components/Containers/Loading';

export default function Users({ searchParams }: { searchParams: SearchParams }) {
  const { data, isLoading } = useQuery({
    queryKey: ['users', searchParams],
    queryFn: () => getAllUser(getSearchParams(searchParams).toString()),
  });

  return (
    <div className="mt-3">
      <UserAction />
      <div className="mt-3">
        <SearchBar search="name_like" limit={searchParams.limit} />
      </div>
      <Loading isLoading={isLoading}>
        <table className="mt-3 min-w-full rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.users.map((user: User) => (
              <UserCard user={user} key={user.id} />
            ))}
          </tbody>
        </table>
        {data?.data.users?.length === 0 ? (
          <span className="py-6 text-center text-gray-500">No users found</span>
        ) : (
          <Pagination currentPage={data?.current_page} lastPage={data?.last_page} />
        )}
      </Loading>
    </div>
  );
}

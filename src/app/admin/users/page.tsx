import { getAllUser } from '@/services/apis/user.api.service';
import { User } from '@/types/common';
import UserCard from './components/userCard';
import Pagination from '@/components/UI/paginate';
import SearchBar from '../../../components/UI/srearchParam';
import UserAcction from './components/UserAcction';

type SearchParams = {
  name_like?: string;
  limit: number;
  page: number;
};

export default async function Users({ searchParams }: { searchParams: SearchParams }) {
  const nameLike = searchParams.name_like || '';
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  const search = `name_like=${nameLike}&page=${page}&limit=${limit}`;
  let res = await getAllUser(search);

  let users = res.data.data.users as User[];

  return (
    <div className="mt-3">
      <UserAcction />
      <div className="mt-3">
        <SearchBar search="name_like" limit={searchParams.limit} />
      </div>
      <table className="mt-3 min-w-full rounded-lg border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>{users && users.map((user: User) => <UserCard user={user} key={user.id} />)}</tbody>
      </table>
      {users?.length === 0 ? (
        <span className="py-6 text-center text-gray-500">No users found</span>
      ) : (
        <Pagination currentPage={res.data.current_page} lastPage={res.data.last_page} />
      )}
    </div>
  );
}

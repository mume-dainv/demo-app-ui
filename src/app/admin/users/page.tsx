import { getAllUser } from '@/services/apis/user.api.service';
import { User } from '@/types/common';
import Link from 'next/link';
import UserCard from './userCard';

export default async function Users() {
  const res = await getAllUser();
  const users = res.data.data.users;
  return (
    <div className="mt-3">
      <Link
        href={`/admin/users/create`}
        className="rounded bg-blue-500 p-2 px-3 text-white hover:bg-blue-600"
      >
        Create
      </Link>

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
          {users && users.map((user: User) => <UserCard user={user} key={user.id} />)}

          {users?.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

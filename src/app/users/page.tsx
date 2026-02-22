import { getAllUser } from '@/services/apis/users';
import { User } from '@/types/common';
import Link from 'next/link';

export default async function Users() {
  const res = await getAllUser();
  const users = res.data.data.users;

  return (
    <div className="mt-3">
      <Link
        href={`/users/create`}
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
          {users &&
            users.map((user: User) => (
              <tr key={user.id} className="border-t transition hover:bg-gray-50">
                <td className="px-4 py-2">
                  {user.avatar_url ? (
                    <img className="size-10 rounded-full object-cover" src={user.avatar_url} />
                  ) : (
                    <div className="size-10 rounded-full bg-gray-300" />
                  )}
                </td>

                <td className="px-4 py-2 font-medium">{user.name}</td>

                <td className="px-4 py-2 text-gray-600">{user.email}</td>

                <td className="space-x-2 px-4 py-2 text-center">
                  <Link
                    href={`/users/${user.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Edit
                  </Link>

                  <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

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

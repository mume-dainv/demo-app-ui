import { API_URL } from "@/consts/common";
import { DataRespone } from "@/services/base";
import { all } from "@/services/users"
import { User } from "@/types/user";
import { cookies } from "next/headers";
import Link from "next/link";
 
export default async function UserTable() { 
    const res = await all({
        headers: {
            Cookie: `token=${cookies().get('token')?.value}`,
        },
    }) as DataRespone & { users?: User[] };
    
    const users = res.users as User[] | undefined;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
            {users && users.map((user: User) => (
              <Link href={`/users/${user.id}`} key={user.id}>
                <tr
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2">
                {user.avatar_url ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user.avatar_url}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}
              </td>

              <td className="px-4 py-2 font-medium">
                {user.name}
              </td>

              <td className="px-4 py-2 text-gray-600">
                {user.email}
              </td>

              <td className="px-4 py-2 text-center space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>

                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
              </Link>
            ))}
         

          {users?.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="text-center py-6 text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

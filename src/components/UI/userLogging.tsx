import { UserLogging as UserLoggingType } from '@/types/common';

export default function UserLogging({ userLogging }: { userLogging: UserLoggingType[] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Login History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-3">Time</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">User Agent</th>
            </tr>
          </thead>
          <tbody>
            {userLogging.map((item: UserLoggingType, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{new Date(item.login_at).toLocaleString()}</td>
                <td className="p-3 font-mono">{item.ip}</td>
                <td className="p-3 text-gray-600">{item.user_agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

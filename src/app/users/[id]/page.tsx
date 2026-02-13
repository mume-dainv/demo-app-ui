import { DataRespone } from "@/services/base";
import { all, getUser } from "@/services/users";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export default async function page({params}: {params: string}) {
    const res = await getUser(params.id,{
            headers: {
                Cookie: `token=${cookies().get('token')?.value}`,
            },
        }) as DataRespone & { users?: User };
    const user = res.users as User;
    
  return (
    <div>
      {user ? 
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1> : 1}
    </div>
  )
}

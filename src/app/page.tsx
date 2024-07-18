
import { getUserByEmail } from "@/data/user";
import { auth } from "@/auth/auth";
<<<<<<< HEAD
=======
import LogoutButton from "@/auth/components/logout-button";
import { redirect, useRouter } from "next/navigation";
>>>>>>> 388ea997e91183b56e509b80a93d0f48f198216c

import Topbar from "@/components/topbar";
import CardGrid from "@/components/card-grid";
import CardGridTest from "@/components/card-grid-test";


export default async function Home() {
  const session = await auth()
<<<<<<< HEAD
  
  const user = await getUserByEmail(session?.user.email as string)
=======
  // const router = useRouter() 
  if (!session?.user) {
    redirect('/auth/login') 
  }


  const user = await getUserByEmail(session?.user.email)
>>>>>>> 388ea997e91183b56e509b80a93d0f48f198216c
  const keys = user?.keys || []


  return (
    <main className=" min-h-screen bg-gradient-to-b from-[#181C1A] to-[#0D0D0D]">
      <div className=" w-full h-full text-[#FFFFFF] ">
<<<<<<< HEAD
=======
        <Image src="/CARP_Audio_Logo_Website.webp" alt="logo" width={140} height={108} className="mx-auto py-8" />
        <LogoutButton />
>>>>>>> 388ea997e91183b56e509b80a93d0f48f198216c
        <div className="max-w-[1300px] mx-auto">

          {/* Top Bar */}
          <Topbar userName={user?.name as string} userEmail={user?.email as string} />

          {/* Cards Grid */}
          <CardGridTest keys={keys} />

        </div>
      </div>
    </main>
  );
}


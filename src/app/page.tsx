
import { getUserByEmail } from "@/data/user";
import { auth } from "@/auth/auth";

import Topbar from "@/components/topbar";
import CardGrid from "@/components/card-grid";
import CardGridTest from "@/components/card-grid-test";
import Downloads from "@/components/downloads";


export default async function Home() {
  const session = await auth()
  
  const user = await getUserByEmail(session?.user.email as string)
  const keys = user?.keys || []


  return (
    <main className=" min-h-screen bg-gradient-to-b from-[#181C1A] to-[#0D0D0D]">
      <div className=" w-full h-full text-[#FFFFFF]">
        <div className="max-w-[1428px] mx-auto px-[12px] md:px-[60px] lg:px-16">

          {/* Top Bar */}
          <Topbar userName={user?.name as string} userEmail={user?.email as string} />

          {/* Cards Grid */}
          <CardGridTest keys={keys} />

          <Downloads />
        </div>
      </div>
    </main>
  );
}


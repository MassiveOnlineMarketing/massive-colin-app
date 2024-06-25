import Image from "next/image";
import { Inter } from "next/font/google";

import { PRODUCTS } from "@/lib/product-constants";

import { getUserByEmail } from "@/data/user";
import { getSession } from "next-auth/react";
import { auth } from "@/auth/auth";
import LogoutButton from "@/auth/components/logout-button";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await auth()
  // console.log('session: ', session)

  const user = await getUserByEmail(session?.user.email as string)
  const keys = user?.keys || []
  const numCards = 10 - keys.length
  const cards = []
  for (let i = 0; i < numCards; i++) {
    cards.push({})
  }

  
  function getProduct(productId: string) {
    return PRODUCTS[productId]
  }
  

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#181C1A] to-[#0D0D0D]">
      <LogoutButton />
      <Image src="/CARP_Audio_Logo_Website.webp" alt="logo" width={130} height={100} className="mx-auto py-8" />
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className=" w-full h-full text-[#FFFFFF] ">
        <div className="max-w-[1300px] mx-auto">

          {/* Top Bar */}
          <div className="flex flex-col gap-2 pb-8">
            <p className="text-2xl">Jou Naam Gekke Griend</p>
            <p>{session?.user.name}</p>
            <div className="flex items-center justify-between">

              <div className="px-4 py-2 bg-white text-gray-900 rounded-full">
                <p className={`${inter.className}`}>{session?.user.email}</p>
              </div>

              <p className="text-4xl font-bold">My Plugins</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-10">
            {/* Card */}
            {keys?.map((key) => (
              <div key={key.id} className="bg-[#1e211f] flex flex-col gap-4 rounded-3xl px-4 py-3 h-[300px]">
                <h2 className="text-[#FFFFFF] text-3xl text-center">{getProduct(key.productId).name}</h2>

                {/* <p>{getProduct(key.productId).imgUrl}</p> */}
                <Image src={getProduct(key.productId).imgUrl as string} alt="product" width={100} height={130} className="h-[130px] w-fit mx-auto" />

                <div className="px-8 py-4 rounded-full bg-[#262928]">
                  <p className={`${inter.className}`}>{key.key1}</p>
                  <p className={`${inter.className}`}>{key.key2}</p>
                </div>
              </div>
            ))}
            {cards.map((card, index) => (
              <div key={index} className="w-full h-full bg-[#171918] rounded-3xl"></div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}

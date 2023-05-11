import Layout from "@/components/Layout"
import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import React from "react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-1 overflow-hidden text-black bg-gray-300 rounded-lg">
          <Image width={1200} height={1200} src={session?.user?.image} alt="user image" className="w-6 h-6" />
          <span className="px-2">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  )
}

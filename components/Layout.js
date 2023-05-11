import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function Layout({ children }) {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="flex items-center w-screen h-screen bg-blue-900">
                <div className="w-full text-center">
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="flex items-center w-screen h-screen bg-blue-900">
                <div className="w-full text-center">
                    <button onClick={() => signIn('google')} className="p-2 px-4 bg-white rounded-lg">Login with Google</button>
                </div>
            </div>
        )
    }
    return (
        <div className="flex min-h-screen bg-blue-900">
            <Nav />
            <div className="flex-grow p-4 mt-1 mb-2 mr-2 bg-white rounded-lg">{children}</div>
        </div>
    )
}

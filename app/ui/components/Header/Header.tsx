'use client'
import "./Header.styles.css"
import { FiLogOut } from 'react-icons/fi'
// import { useAuth0, LogoutOptions } from '@auth0/auth0-react'
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"

export function Header() {

    const { user} = useUser()

    return (
        <header>
            <div className="container">
                <Link href="/">
                    <Image src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702641917/moviehub/Logo/moviehat_rrk7x2.png" alt="Icono" width={180} height={150} priority/>
                </Link>
                <div className="cart">
                    {user && (
                        <>
                            <span className="user-info">
                                Welcome back {user?.name} !
                            </span>
                            <div className="user-icon">
                                <Image src={user.picture || ""} alt={user.name || ""} width={48} height={48} />
                            </div>

                            <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }}
                                onClick={() => window.location.href = "/api/auth/logout"} >
                                <FiLogOut className="logout-icon" />
                            </button>
                        </>
                    )}

                </div>
            </div>
        </header>
    )
}
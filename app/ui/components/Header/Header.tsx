import "./Header.styles.css"
import { FiLogOut } from 'react-icons/fi'
// import { useAuth0, LogoutOptions } from '@auth0/auth0-react'
import Link from "next/link"
import Image from "next/image"

export function Header() {

    // const { user, logout } = useAuth0()

    return (
        <header>
            <div className="container">
                <Link href="/home">
                    <Image src="/moviehatlogo.png"alt="Icono" width={180} height={150}/>
                </Link>
                <div className="cart">
                    <span className="user-info">
                        {/* Welcome back {user?.name} ! */}
                    </span>
                    <div className="user-icon">
                        {/* <img src={user?.picture} alt={user?.name} /> */}
                    </div>

                    {/* <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }}
                        onClick={() => logout({ returnTo: window.location.origin } as LogoutOptions)} >
                        <FiLogOut className="logout-icon" />
                    </button> */}
                </div>
            </div>
        </header>
    )
}
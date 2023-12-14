import { useAuth0, LogoutOptions } from '@auth0/auth0-react'

const Logout = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin } as LogoutOptions)}>Logout</button>
    )

}

export default Logout
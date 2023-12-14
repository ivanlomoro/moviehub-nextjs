import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './Login-styles.css';

const Login = () => {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await loginWithPopup();

            if (isAuthenticated && user) {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${apiUrl}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                    }),
                });

                if (response.status === 201 || response.status === 409) {
                    await response.json();
                } else {
                    console.error('Error creating or verifying user');
                }
            }
            navigate('/home');
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <>
            <div className="login-container">
                <img src="./src/assets/imgs/moviehatlogo.png" className="img-icon-login" alt="Icono" />
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </>
    );
};

export default Login;

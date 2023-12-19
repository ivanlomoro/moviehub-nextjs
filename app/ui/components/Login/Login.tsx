import "./Login-styles.css";
import Image from 'next/image';

const Login = () => {
    return (
        <div className="login-container">
            <Image src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702641917/moviehub/Logo/moviehat_rrk7x2.png" className="img-icon-login" alt="Icono" width={200} height={200} priority/>
            <a href = "/api/auth/login"  className="login-btn">
                Login
            </a>
        </div>
    );
};

export default Login;

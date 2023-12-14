import { FaLinkedin, FaGithub } from 'react-icons/fa'

import "./Footer.styles.css"
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="centered-content">
                <div className="icon-container">
                    <Link href="https://www.linkedin.com/in/ivanlomoro/" target="_blank">
                        <FaLinkedin className="social-icon" />
                    </Link>
                </div>
                <div className="icon-container">
                    <Link href="https://github.com/ivanlomoro" target="_blank">
                        <FaGithub className="social-icon" />
                    </Link>
                </div>
                <div className="icon-container">
                    <Link href="https://assemblerinstitute.com/" target="_blank">
                        <Image src="/aiticono.jpg" alt="ait-icon" className='ait-icon' width={180} height={150}/>
                    </Link>
                </div>
            </div>
            <div className="centered-content">
                <p className="copyright-text">© 2023 MovieHat by Iván Martín Lomoro at AIT</p>
            </div>
        </footer>
    )
}

export default Footer
'use client'
import "./Header.styles.css"
import { FiLogOut } from 'react-icons/fi'
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n"
import toast from "react-hot-toast"
import { useState } from "react"

export function Header() {

    const { user } = useUser()
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const changeLanguage = (language: string) => {
        if (language === "es") {
            i18n.changeLanguage(language);
            toast.success(t("Language set to Spanish!"));
            localStorage.setItem("language", language);
            setSelectedLanguage(language);
        } else {
            i18n.changeLanguage("en");
            toast.success(t("Language set to English!"));
            localStorage.setItem("language", language);
            setSelectedLanguage(language);
        }
    };

    return (
        <header>
            <div className="container">
                <Link href="/">
                    <Image src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702641917/moviehub/Logo/moviehat_rrk7x2.png" alt="Icono" width={180} height={150} priority />
                </Link>
                <div className="cart">
                    {user && (
                        <>
                            <span className="user-info">
                                {t("Welcome back")} {user?.name} !
                            </span>
                            <div className="user-icon">
                                <Image src={user.picture || ""} alt={user.name || ""} width={48} height={48} />
                            </div>

                            <div className="tooltip-container">
                                <Image
                                    src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1705253478/moviehub/flags/Google_Translate_logo.svg_zb4ppw.png"
                                    alt="translate"
                                    width={22}
                                    height={22}
                                />
                                <Image
                                    onClick={() => changeLanguage("es")}
                                    src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1705150974/moviehub/flags/banderaSpain_l3n0rg.png"
                                    alt="spain-flag"
                                    width={22}
                                    height={22}
                                    className="tooltip1"
                                />
                                <Image
                                    onClick={() => changeLanguage("en")}
                                    src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1705150974/moviehub/flags/banderaUk_t2ega6.png"
                                    alt="uk-flag"
                                    width={22}
                                    height={22}
                                    className="tooltip2"
                                />
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
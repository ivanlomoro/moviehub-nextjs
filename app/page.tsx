'use client'
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Header } from "./ui/components/Header/Header";
import HomeComponent from "./ui/components/HomeComponent/HomeComponent";
import Footer from "./ui/components/Footer/Footer";


const HomePage = () => {
    return (
        <>
            <Header />
            <HomeComponent />
            <Footer />
        </>
    );
};

export default withPageAuthRequired(HomePage);

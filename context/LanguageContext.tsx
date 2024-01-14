'use client'
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import i18n from "../app/i18n";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

type LanguageProviderProps = {
    children: ReactNode;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    const contextValue: LanguageContextType = {
        language,
        setLanguage,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    return context;
};

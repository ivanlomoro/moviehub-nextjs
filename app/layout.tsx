import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'
import { MovieProvider } from '@/context/MovieContext';
import { akaya_kanadaka } from './fonts';
import ToasterComponent from './ui/components/Toaster/ToasterComponent';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702642138/moviehub/Logo/100hat_lnlp71.png" />
        <title>MovieHat</title>
      </head>
      <UserProvider>
        <MovieProvider>
          <LanguageProvider>
            <body className={akaya_kanadaka.className}>
              <ToasterComponent />
              {children}
            </body>
          </LanguageProvider>
        </MovieProvider>
      </UserProvider>
    </html>
  )
}


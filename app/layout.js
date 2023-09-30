import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather App',
  description: 'Get the current Weather from your area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + 'min-h-screen'} style={{backgroundImage: `url("/assets/bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        <main className='h-[100vh]'>{children}</main>
      </body>
    </html>
  )
}

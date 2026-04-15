import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/shared/styles/variables.css'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Inventory App',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  (function() {
                    try {
                      var theme = localStorage.getItem('theme');
                      if (!theme) {
                        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        theme = isDark ? 'dark' : 'light';
                      }
                      document.documentElement.setAttribute('data-theme', theme);
                    } catch (e) {}
                  })();
                              `,
          }}
        />
      </head>

      <body className="app">{children}</body>
    </html>
  )
}

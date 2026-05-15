import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { Toaster } from "react-hot-toast";
import BlinkingStars from "@/components/sections/blinking-stars";


const geistSans = Geist({
  variable: "--font-geist-sans",

  subsets: ["latin"],

});



const geistMono = Geist_Mono({

  variable: "--font-geist-mono",

  subsets: ["latin"],

});



export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {

  title: "Portfolio Site",

  description:

    "Modern, responsive CV and portfolio website for a software developer showcasing projects, skills, resume, and contact details.",

  metadataBase:

    process.env.NEXT_PUBLIC_BASE_URL

      ? new URL(process.env.NEXT_PUBLIC_BASE_URL)

      : undefined,

  openGraph: {

    title: "Portfolio | Software Developer",

    description:

      "Modern, responsive CV and portfolio website for a software developer.",

    type: "website",

  },

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html lang="en" suppressHydrationWarning>

      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}

      >

        <ThemeProvider

          attribute="class"

          defaultTheme="dark"

          enableSystem

          enableColorScheme

          disableTransitionOnChange

        >

          <BlinkingStars />

          <div className="relative z-10 flex min-h-dvh flex-col text-foreground">

            <Toaster position="top-right" />

            <PageTransition>

              <main className="flex-1 pb-8 sm:pb-10">

                {children}

              </main>

            </PageTransition>

            <Footer />

          </div>

        </ThemeProvider>

      </body>

    </html>

  );

}


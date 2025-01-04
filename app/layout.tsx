import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import ReduxProvider from "@/providers/redux-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "sonner";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connective AI",
  description:
    "Automate messaging, streamline workflows, and boost engagement across social media with intelligent, AI-powered tools and real-time insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </ThemeProvider>
          
          <Script
            id="feedback-widget"
            strategy="afterInteractive"
          >
            {`
              (function() {
                const script = document.createElement('script');
                script.src = 'https://clearfeedback.vercel.app/api/widget';
                script.async = true;
                script.onload = function() {
                  window.FeedbackWidget.init('d92ca143-fd04-44e8-a069-1c96db9bb451');
                };
                document.head.appendChild(script);
              })();
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
} 
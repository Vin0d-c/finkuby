import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GA_ID, GTM_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Finkuby provides instant, paperless credit solutions and automated bank matching for salaried professionals and business owners in India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Finkuby | Smart Loans & Paperless Credit Solutions for India",
    template: "%s",
  },
  description,
  applicationName: "Finkuby",
  openGraph: {
    type: "website",
    siteName: "Finkuby",
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Script id="enable-graphics" strategy="beforeInteractive">
          {`(function(){var native=window.matchMedia.bind(window);function list(query,matches){var listeners=new Set();return{media:query,matches:matches,onchange:null,addListener:function(fn){listeners.add(fn)},removeListener:function(fn){listeners.delete(fn)},addEventListener:function(type,fn){if(type==="change")listeners.add(fn)},removeEventListener:function(type,fn){listeners.delete(fn)},dispatchEvent:function(){return true}}}window.matchMedia=function(query){var q=String(query);if(q.indexOf("prefers-reduced-motion")===-1)return native(query);var noPref=/prefers-reduced-motion\\s*:\\s*no-preference/.test(q);var reduce=/prefers-reduced-motion\\s*:\\s*reduce/.test(q)||(/\\(\\s*prefers-reduced-motion\\s*\\)/.test(q)&&!noPref);if(noPref&&!reduce)return list(q,true);if(reduce&&!noPref)return list(q,false);return native(query)}})();`}
        </Script>
        {/* A refresh always starts at the top of the page: no restored scroll position, and
            no jump to a leftover #hash (e.g. #calculator set by the Apply Now links). */}
        <Script id="refresh-to-top" strategy="beforeInteractive">
          {`(function(){try{var n=performance.getEntriesByType("navigation")[0];if(!n||n.type!=="reload")return;history.scrollRestoration="manual";if(location.hash)history.replaceState(history.state,"",location.pathname+location.search);var top=function(){window.scrollTo(0,0)};top();addEventListener("DOMContentLoaded",top);addEventListener("load",function(){top();requestAnimationFrame(top)});}catch(e){}})();`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <style>{".blur-text span{opacity:1!important;filter:none!important;transform:none!important}"}</style>
        </noscript>
        {children}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}

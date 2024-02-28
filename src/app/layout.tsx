import "./globals.css";
import { Wix_Madefor_Text } from "next/font/google";
import Script from "next/script";

const wix_Madefor_Text = Wix_Madefor_Text({
  subsets: ["latin"],
  variable: "--sans-serif",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={wix_Madefor_Text.variable}>
      <Script
        type="module"
        defer
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/waveform.js"
      ></Script>

      <body>{children}</body>
    </html>
  );
}

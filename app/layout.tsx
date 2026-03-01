import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "LumaGrowth - Performance Marketing That Converts",
  description:
    "Launch campaigns that actually convert. Performance marketing + creative + CRO. We help brands scale profitably.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-dark-bg text-white">
        {children}
      </body>
    </html>
  );
}

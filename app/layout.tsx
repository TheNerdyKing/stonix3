import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "STONIX | Results. Not Marketing.",
  description: "We handle everything related to advertising - so you have peace of mind. With one clear goal: bringing you more customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased bg-background text-surface">
        {children}
      </body>
    </html>
  );
}

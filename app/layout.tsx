import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "STONIX | תוצאות. לא שיווק.",
  description: "אנחנו מטפלים בכל מה שקשור לפרסום - כדי שיהיה לך שקט נפשי. עם מטרה אחת ברורה: להביא לך יותר לקוחות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-surface">
        {children}
      </body>
    </html>
  );
}

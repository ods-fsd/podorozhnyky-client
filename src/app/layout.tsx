import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Подорожники",
  description: "Проєкт для тих, хто живе подорожами",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}

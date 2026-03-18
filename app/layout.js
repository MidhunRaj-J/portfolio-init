export const metadata = {
  title: "MJ",
  description: "MJ — AI Architect & Musician Portfolio",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

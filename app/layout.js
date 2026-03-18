export const metadata = {
  title: "Neural Rebel // Portfolio OS",
  description: "Interactive futuristic portfolio concept",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

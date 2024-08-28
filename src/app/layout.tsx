import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blind for Students.",
  description: "A web application to help students ask doubts anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

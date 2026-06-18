import React from "react";

export const metadata = {
  title: "Daily Gospel API (Evangelio Diario)",
  description: "A resilient, multi-denomination API for daily liturgical readings in Spanish.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0a0d16" }}>
        {children}
      </body>
    </html>
  );
}

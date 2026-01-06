import "./globals.css";
import { ReactNode } from "react";

// Metadata cho SEO
export const metadata = {
  title: "EMR Hospital - Quản lý Bệnh nhân",
  description: "Hệ thống quản lý hồ sơ bệnh án điện tử chuyên nghiệp",
  keywords: ["EMR", "Hospital", "Patient Management", "Healthcare"],
  authors: [{ name: "EMR Team" }],
  openGraph: {
    title: "EMR Hospital",
    description: "Hệ thống quản lý hồ sơ bệnh án điện tử",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="m-0 p-0 antialiased">{children}</body>
    </html>
  );
}

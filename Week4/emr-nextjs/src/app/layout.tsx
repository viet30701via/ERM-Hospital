import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

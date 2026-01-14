"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathNodes = pathname.split("/").filter((node) => node !== "");

  return (
    <nav aria-label="Breadcrumb" className="flex mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
        </li>

        {pathNodes.map((node, index) => {
          // node "dashboard" -> /dashboard
          // node "patients" -> /dashboard/patients
          const href = "/" + pathNodes.slice(0, index + 1).join("/");

          const isLast = index === pathNodes.length - 1;

          // Viết hoa chữ cái đầu
          const label = node.charAt(0).toUpperCase() + node.slice(1);

          return (
            <li key={href} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="font-semibold text-gray-900">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

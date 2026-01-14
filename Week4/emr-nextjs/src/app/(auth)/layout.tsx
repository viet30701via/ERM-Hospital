import { ReactNode } from "react";

export const metadata = {
  title: "Login - EMR Hospital",
  description: "Login page",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}

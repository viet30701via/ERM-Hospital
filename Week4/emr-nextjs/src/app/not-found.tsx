import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-blue-600">404</h2>
      <p className="text-gray-600">Sory, Page not found !</p>
      <Link
        href="/dashboard"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Back Dashboard
      </Link>
    </div>
  );
}

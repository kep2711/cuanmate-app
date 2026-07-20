import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        {/* Main Logo & Brand Header */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007A55] text-lg font-bold text-white shadow-sm">
              $
            </span>
            <span className="text-2xl font-bold tracking-tight text-[#007A55]">
              Cuanmate
            </span>
          </Link>
        </div>

        {/* Page Content (Login / Register) */}
        <div>{children}</div>
      </div>
    </div>
  );
}

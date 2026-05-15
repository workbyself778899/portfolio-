import AdminHeader from "./Header";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full">
      <AdminHeader />
      <div className="container mx-auto my-4 px-4 sm:my-5 sm:px-6">
        {children}
      </div>
    </div>
  );
}

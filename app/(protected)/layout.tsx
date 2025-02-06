import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        {children}
        <Toaster richColors />
      </div>
    </SessionProvider>
  );
}

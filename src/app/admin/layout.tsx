import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!subscriber?.is_admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <nav className="bg-sage-dark text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-serif text-lg font-semibold no-underline text-white"
          >
            HSA Days <span className="text-gold-light font-normal text-sm ml-1">Admin</span>
          </Link>
        </div>
        <Link
          href="/"
          className="text-white/70 text-sm no-underline hover:text-white transition-colors"
        >
          &larr; Back to site
        </Link>
      </nav>
      <div className="max-w-[1100px] mx-auto px-6 py-8">{children}</div>
    </div>
  );
}

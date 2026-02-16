"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type TopbarProps = {
  email: string;
};

export function Topbar({ email }: TopbarProps) {
  const router = useRouter();

  const onLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <p className="text-sm text-muted-foreground">Benvenuto</p>
        <p className="font-medium">{email}</p>
      </div>
      <Button variant="outline" onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}

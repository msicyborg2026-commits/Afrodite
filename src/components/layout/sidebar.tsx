import Link from "next/link";
import { CalendarDays, Users, Scissors, Wallet, BarChart3, Settings } from "lucide-react";

const navItems = [
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/clienti", label: "Clienti", icon: Users },
  { href: "/servizi", label: "Servizi", icon: Scissors },
  { href: "/cassa", label: "Cassa", icon: Wallet },
  { href: "/report", label: "Report", icon: BarChart3 },
  { href: "/impostazioni", label: "Impostazioni", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-white/90 p-4 lg:block">
      <div className="mb-8 px-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Gestionale</p>
        <h2 className="text-lg font-semibold">Centro Estetico</h2>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

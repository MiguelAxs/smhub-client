import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  SlidersHorizontal,
  Boxes,
  Users,
  Tags,
  ClipboardList,
  type LucideIcon,
} from "lucide-react"

import { canAccess } from "@/shared/utils/roles"

export interface NavItem {
  type?: "item"
  label: string
  to: string
  icon: LucideIcon
  // roles?: Role[]
  placeholder?: boolean
  end?: boolean
}

export interface NavGroup {
  type: "group"
  label: string
  icon: LucideIcon
  // roles?: Role[]
  items: NavItem[]
}

export type NavEntry = NavItem | NavGroup

export const NAV_ITEMS: NavEntry[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Produtos", to: "/produtos", icon: Package },
  { label: "Categorias", to: "/categorias", icon: Tags },
  { label: "Estoque", to: "/estoque", icon: Boxes },
  {
    type: "group",
    label: "Movimentações",
    icon: ClipboardList,
    items: [
      { label: "Entradas", to: "/entradas", icon: ArrowDownToLine },
      { label: "Saídas", to: "/saidas", icon: ArrowUpFromLine },
      { label: "Ajustes", to: "/ajustes", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Usuários",
    to: "/usuarios",
    icon: Users,
    // roles: ["ADMINISTRADOR", "GERENTE"],
  },
]

export function getFlatNavItems(cargo: string /*Role*/ | undefined): NavItem[] {
  const result: NavItem[] = []
  for (const entry of NAV_ITEMS) {
    // if (!canAccess(cargo, entry.roles)) continue
    if (entry.type === "group") {
      result.push(...entry.items)
    } else {
      result.push(entry)
    }
  }
  return result
}

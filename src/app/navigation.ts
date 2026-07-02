import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  SlidersHorizontal,
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
  {
    type: "group",
    label: "Teste",
    icon: ClipboardList,
    items: [
      { label: "teste1", to: "/teste", icon: ArrowDownToLine },
      { label: "teste2", to: "/teste", icon: ArrowUpFromLine },
      { label: "teste3", to: "/teste", icon: SlidersHorizontal },
    ],
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

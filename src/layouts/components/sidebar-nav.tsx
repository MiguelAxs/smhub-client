import { NavLink, useLocation, matchPath } from "react-router-dom"
import { motion } from "motion/react"
import { NAV_ITEMS, type NavEntry, type NavItem } from "@/app/navigation"
import { useAuth } from "@/features/auth/context/auth-context"
import { canAccess } from "@/shared/utils/roles"
import { cn } from "@/shared/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip"
import { NAV_ITEM_PADDING, SIDEBAR_TRANSITION } from "@/shared/motion/sidebar-transition"
import {useEffect, useState} from "react";

const MotionNavLink = motion(NavLink)

interface SidebarNavProps {
  collapsed: boolean
  onNavigate?: () => void
}

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"

function NavItemLink({
                       item,
                       collapsed,
                       onNavigate,
                     }: {
  item: NavItem
  collapsed: boolean
  onNavigate?: () => void
}) {
  const location = useLocation()
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    setTooltipOpen(false)
  }, [collapsed])

  const isActive = item.end
      ? location.pathname === item.to
      : Boolean(matchPath({ path: item.to, end: false }, location.pathname))

  const linkClassName = cn(
      "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
      "text-muted-foreground hover:bg-secondary hover:text-foreground",
      isActive &&
      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      focusRing,
  )

  const paddingLeft = collapsed
      ? NAV_ITEM_PADDING.collapsed.paddingLeft
      : NAV_ITEM_PADDING.expanded.paddingLeft
  const paddingRight = collapsed
      ? NAV_ITEM_PADDING.collapsed.paddingRight
      : NAV_ITEM_PADDING.expanded.paddingRight

  const link = (
      <MotionNavLink
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={linkClassName}
          animate={{ paddingLeft, paddingRight }}
          transition={SIDEBAR_TRANSITION}
      >
        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span
            className={cn(
                "min-w-0 flex-1 truncate overflow-hidden whitespace-nowrap transition-opacity duration-150",
                collapsed && "opacity-0",
            )}
            aria-hidden={collapsed}
        >
        {item.label}
      </span>
        {collapsed && <span className="sr-only">{item.label}</span>}
      </MotionNavLink>
  )

  return (
      <Tooltip open={collapsed && tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
  )
}

function flattenItems(entries: NavEntry[]): NavItem[] {
  return entries.flatMap((entry) =>
      entry.type === "group" ? entry.items : [entry as NavItem],
  )
}

export function SidebarNav({ collapsed, onNavigate }: SidebarNavProps) {
  const { user } = useAuth()

  const visibleEntries = NAV_ITEMS
  // .filter((entry) => canAccess(user?.cargo, entry.roles))
  const items = flattenItems(visibleEntries)

  return (
      <nav className="flex flex-col gap-1 px-3 py-2 overflow-x-hidden" aria-label="Navegação principal">
        {items.map((item) => (
            <NavItemLink
                key={item.to}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
            />
        ))}
      </nav>
  )
}
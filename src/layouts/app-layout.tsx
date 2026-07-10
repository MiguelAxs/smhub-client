import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { PanelLeftClose, PanelLeft, X } from "lucide-react"
import { LogoMark } from "@/shared/components/logo"
import { SidebarNav } from "./components/sidebar-nav"
import { UserMenu } from "./components/user-menu"
import { Button } from "@/shared/ui/button"
import { useMediaQuery } from "@/shared/hooks/use-media-query"
import { getFlatNavItems } from "@/app/navigation"
import { useAuth } from "@/features/auth/context/auth-context"
import { cn } from "@/shared/lib/utils"
import { HEADER_PADDING_LEFT, SIDEBAR_TRANSITION } from "@/shared/motion/sidebar-transition"

const COLLAPSE_KEY = "stockflow:sidebar-collapsed"

export function AppLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "true")
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }, [collapsed])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const activeItem = getFlatNavItems(undefined).find((item) =>
      item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  )

  return (
      <div className="flex min-h-svh bg-background">
        {isDesktop && (
            <motion.aside
                layout
                animate={{ width: collapsed ? 80 : 256 }}
                transition={SIDEBAR_TRANSITION}
                className="sticky top-0 flex h-svh shrink-0 flex-col border-r border-border bg-card"
            >
              <div className="flex h-16 items-center gap-2 border-b border-border pr-4">
                <motion.div
                    className="flex items-center gap-2"
                    animate={{
                      paddingLeft: collapsed ? HEADER_PADDING_LEFT.collapsed : HEADER_PADDING_LEFT.expanded,
                    }}
                    transition={SIDEBAR_TRANSITION}
                >
                  <LogoMark className="size-8 shrink-0" />
                  <motion.span
                      initial={false}
                      animate={{ opacity: collapsed ? 0 : 1 }}
                      transition={{ duration: 0.15, delay: collapsed ? 0 : 0.1 }}
                      className="whitespace-nowrap overflow-hidden text-lg font-semibold"
                  >
                    <span className="font-heading text-lg font-bold leading-none tracking-tight whitespace-nowrap overflow-hidden">
                      <span className="text-primary">On</span>da
                    </span>
                  </motion.span>
                </motion.div>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <SidebarNav collapsed={collapsed} />
              </div>

              <div className="border-t border-border p-3">
                <UserMenu collapsed={collapsed} />
              </div>

              <motion.div layout className="absolute -right-10 top-6 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCollapsed((c) => !c)}
                    className="h-8 w-8 rounded-full shadow-md"
                >
                  {collapsed ? (
                      <PanelLeft className="h-5 w-5" />
                  ) : (
                      <PanelLeftClose className="h-5 w-5" />
                  )}
                </Button>
              </motion.div>
            </motion.aside>
        )}

        <AnimatePresence>
          {!isDesktop && mobileOpen && (
              <>
                <motion.div
                    className="fixed inset-0 z-40 bg-black/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
                <motion.aside
                    className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 280 }}
                    role="dialog"
                    aria-label="Menu de navegação"
                >
                  <div className="flex h-16 items-center justify-between border-b border-border px-4">

                    <div className="flex justify-center items-center gap-1">

                      <LogoMark className="size-8 shrink-0" />

                      <span className="font-heading text-lg font-bold leading-none tracking-tight whitespace-nowrap overflow-hidden">
                        <span className="text-primary">On</span>da
                      </span>

                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Fechar menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-2">
                    <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />
                  </div>
                  <div className="border-t border-border p-3">
                    <UserMenu collapsed={false} />
                  </div>
                </motion.aside>
              </>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          {!isDesktop && !mobileOpen && (
              <motion.div layout className="absolute left-6 top-6 z-30">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMobileOpen(true)}
                    className="h-8 w-8 rounded-full shadow-md"
                >
                  <PanelLeft className="h-5 w-5" />
                </Button>
              </motion.div>
          )}

          <main className="flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
  )
}
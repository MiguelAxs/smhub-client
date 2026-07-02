import { LogOut, ChevronsUpDown } from "lucide-react"
import { useAuth } from "@/features/auth/context/auth-context"
import { Avatar, AvatarFallback} from "@/shared/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { CARGO_LABEL } from "@/shared/utils/roles"
import { getInitials } from "@/shared/lib/utils"
import { cn } from "@/shared/lib/utils"
import {motion} from "motion/react";

export function UserMenu({ collapsed }: { collapsed: boolean }) {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <DropdownMenu>

      <DropdownMenuTrigger
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary",
        )}
      >

        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>

        {!collapsed && (
          <>


          </>
        )}

        <motion.span
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.15, delay: collapsed ? 0 : 0.1 }}
            className="whitespace-nowrap overflow-hidden flex w-full gap-3 text-lg font-semibold"
        >

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
            {/*<p className="truncate text-xs text-muted-foreground">{CARGO_LABEL[user.cargo]}</p>*/}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />

        </motion.span>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top" className="w-56">
        <DropdownMenuLabel>
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logout()} className="text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"

import { useAuth } from "@/features/auth/context/auth-context"
// import type { Cargo } from "@/features/auth/types/auth-types"

// interface ProtectedRouteProps {
//   roles?: Role[]
// }

export function ProtectedRoute(/*{ roles }: ProtectedRouteProps*/) {
  const { isAuthenticated, isInitializing, /*hasRole*/ } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // if (roles && !hasRole(roles)) {
  //   return <Navigate to="/dashboard" replace />
  // }

  return <Outlet />
}

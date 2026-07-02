import { api } from "@/shared/services/api.ts"
import type { LoginRequest, LoginResponse } from "@/features/auth/types/auth-types.ts"

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", payload)
    return data
  },
}

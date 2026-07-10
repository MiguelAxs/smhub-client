import axios from "axios"

import { tokenStorage } from "./token-storage"


const baseURL = "http://localhost:8080/api"

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})


let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler
}

api.interceptors.request.use((config) => {
  const token = tokenStorage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const isLoginRequest = error?.config?.url?.includes("/auth/login")
    if (status === 401 && !isLoginRequest) {
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Providers } from "@/app/providers"
import { LoginPage } from "@/features/auth/pages/login-page"
import {AppLayout} from "@/layouts/app-layout.tsx";
import {DashboardPage} from "@/features/dashboard/dashboard-page.tsx";

export default function App() {
  return (
      <Providers>
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<AppLayout/>}>
                  <Route path="/dashboard" element={<DashboardPage/>}/>
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </Providers>
  )
}

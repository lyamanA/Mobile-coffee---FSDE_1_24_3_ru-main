import ThemeProvider from "@/context/theme-provider";
import LayoutContent from "@/layout/layout-content";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";


export default function RootLayout() {
  const loadUsers = useAuthStore(state => state.loadUsers);
  
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

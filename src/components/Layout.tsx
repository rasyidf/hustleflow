"use client"

import { Calculator, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import type React from "react"; // Import React
import { ScrollArea } from "./ui/scroll-area"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar"

const menus = [
  { href: "/", icon: Calculator, label: "Calculator" },
  { href: "/settings", icon: Settings, label: "Settings" }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()


  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64" variant="floating">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">HustleFlow</h2>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <SidebarMenu>
                {menus.map((menu) => {
                  const Icon = menu.icon
                  return (
                    <SidebarMenuItem key={menu.href}>
                      <SidebarMenuButton asChild isActive={pathname === menu.href}>
                        <a href={menu.href}>
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{menu.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}


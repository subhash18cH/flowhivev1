import React from 'react'
import { Calendar, Handshake, Heart, Search, Settings, Menu } from "lucide-react"
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link } from 'react-router-dom';

const MySideBar = () => {
  const items = [
    {
      title: "Matches",
      url: "/matches",
      icon: FaHeart,
      color: "text-red-500",
    },
    {
      title: "Partner ",
      url: "/partner",
      icon: Handshake,
      color: "text-blue-500",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: FaUser,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
  return (
    <div className="h-screen flex">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>FlowHive</SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="text-sm text-muted-foreground">© FlowHive 2025</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="h-10 w-10 ml-2">
        <Menu className="h-4 w-4" />
      </SidebarTrigger>
     
    </div>
  )
}

export default MySideBar
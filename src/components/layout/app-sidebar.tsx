// "use client"
// import {
//   Sidebar,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
// } from "../ui/sidebar";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { BanknoteIcon, CircleDollarSign, LayoutDashboardIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { logout } from "@/app/(auth)/login/actions";

// const sidebarItems = [
//   {
//     label: "Dashboard",
//     icon: <LayoutDashboardIcon/>,
//     href: "/dashboard",
//   },
//   {
//     label: "Transaction",
//     icon: <BanknoteIcon />,
//     href: "/dashboard/transaction",
//   },
// ];
// export function AppSidebar(){
//     const pathname=usePathname()
//     return (
//         <Sidebar collapsible="icon" variant="floating" >
//             <SidebarHeader className="gap-2 flex-row items-center ">
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton asChild >
//                             <Link href="/dashboard">
//                                 <CircleDollarSign className="text-primary size-5!"/>
//                                 <h1 className="text-2xl font-bold text-primary">Cuanmate</h1>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>
//             <SidebarContent>
//                 <SidebarMenu>
//                     {sidebarItems.map((item)=>(
//                         <SidebarMenuItem key={item.label}>
//                             <SidebarMenuButton asChild tooltip={item.label} className={cn(
//                                 'py-6 px-5 text-mb ',
//                                 pathname===item.href?'bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground' : ''
//                             )}>
//                                 <Link href={item.href}>
//                                     {item.icon}
//                                     <span>
//                                         {item.label}
//                                     </span>
//                                 </Link>
//                             </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     ))}
//                 </SidebarMenu>
//             </SidebarContent>
//         </Sidebar>
//     )
// }

"use client";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BanknoteIcon,
  CircleDollarSign,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/login/actions";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboardIcon />,
    href: "/dashboard",
  },
  {
    label: "Transaction",
    icon: <BanknoteIcon />,
    href: "/dashboard/transaction",
  },
];
export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="gap-2 flex-row items-center ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <CircleDollarSign className="text-primary size-5!" />
                <h1 className="text-2xl font-bold text-primary">Cuanmate</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={cn(
                  "py-6 px-5 text-mb ",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground"
                    : "",
                )}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logout} className="w-full">
              <SidebarMenuButton
                type="submit"
                tooltip="Keluar"
                className="w-full text-destructive hover:text-destructive"
              >
                <LogOutIcon />
                <span>LogOut</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
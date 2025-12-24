"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items, label = "Platform" }) {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const active = items.find((item) =>
      item.items?.some((sub) => pathname.startsWith(sub.url))
    );

    if (active) {
      setOpenItem(active.title);
    }
  }, [pathname, items]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openItem === item.title;

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={() => setOpenItem(isOpen ? null : item.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

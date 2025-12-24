import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

function DashboardCard({ title, description, href }) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition cursor-pointer h-full">
        <CardContent className="p-6 space-y-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function Page() {
  const user = await currentUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}

        {/* original codebase has been kept instack */}
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
              title="Quizzes"
              description="Create and manage quizzes"
              href="/admin/quizzes"
            />
            <DashboardCard
              title="Tests"
              description="Create tests and assign candidates"
              href="/admin/tests"
            />
            <DashboardCard
              title="Results"
              description="Review submissions and scores"
              href="/admin/results"
            />
          </div>

          {/* Secondary modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardCard
              title="Positions"
              description="Manage job positions"
              href="/admin/positions"
            />
            <DashboardCard
              title="Interviewees"
              description="Manage test takers"
              href="/admin/interviewees"
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Activity, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your feedback statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">
                  "Great service! Really impressed with the response time."
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <span>John Doe</span>
                  <span className="mx-2">•</span>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">
                  "The new feature is exactly what we needed. Thank you!"
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <span>Jane Smith</span>
                  <span className="mx-2">•</span>
                  <span>5 hours ago</span>
                </div>
              </div>
              <div className="pb-4">
                <p className="text-sm text-muted-foreground">
                  "Would love to see more customization options in the future."
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <span>Mike Johnson</span>
                  <span className="mx-2">•</span>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Widget Views
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last 7 days
                  </p>
                </div>
                <div className="text-2xl font-bold">12.5k</div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Conversion Rate
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Feedback/Views
                  </p>
                </div>
                <div className="text-2xl font-bold">9.2%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Active Widgets
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Deployed
                  </p>
                </div>
                <div className="text-2xl font-bold">45</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
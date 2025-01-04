/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft,
  Download,
  LineChart,
  MessageSquare,
  Star,
  ThumbsUp,
  Check,
  Copy,
  Code,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  website_url: string;
  created_at: string;
}

interface Feedback {
  id: string;
  feedback_text: string;
  submitted_at: string;
  user_email: string;
  user_name: string;
  metadata: {
    rating?: number;
    sentiment?: string;
  };
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasWidget, setHasWidget] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchProjectDetails();
    fetchFeedback();
    fetchWidgetConfig().then((widget) => {
      if (widget) {
        setHasWidget(true);
      }
    });
  }, []);

  async function fetchProjectDetails() {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch project details",
      });
      router.push("/dashboard");
    }
  }

  async function fetchFeedback() {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("business_id", params.id)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setFeedback(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch feedback",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchWidgetConfig() {
    try {
      const { data: widget, error } = await supabase
        .from("widget")
        .select("*")
        .eq("business_id", params.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      return widget;
    } catch (error) {
      return null;
    }
  }

  async function handleDeleteProject() {
    try {
      const { error } = await supabase
        .from("businesses")
        .delete()
        .eq("id", params.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    }
  }

  function downloadCSV() {
    const headers = ["Date", "Name", "Email", "Feedback", "Rating"];
    const csvData = feedback.map((f) => [
      new Date(f.submitted_at).toLocaleDateString(),
      f.user_name,
      f.user_email,
      f.feedback_text,
      f.metadata?.rating || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `feedback-${project?.name}-${new Date().toISOString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const averageRating =
    feedback.reduce(
      (acc, f) => acc + (f.metadata?.rating || 0),
      0
    ) / feedback.length || 0;

  function getEmbedScript() {
    return `<script>
  (function() {
    const script = document.createElement('script');
    script.src = '${process.env.NEXT_PUBLIC_APP_URL}/api/widget';
    script.async = true;
    script.onload = function() {
      window.FeedbackWidget.init('${params.id}');
    };
    document.head.appendChild(script);
  })();
</script>`;
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(getEmbedScript());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Success",
        description: "Script copied to clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy script",
      });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleEditClick(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {project?.name}
            </h2>
            <p className="text-muted-foreground">{project?.website_url}</p>
          </div>
        </div>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                project and all associated feedback.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={handleDeleteProject}
              >
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!project?.website_url && (
        <Alert className="mb-4">
          <AlertTitle>Website URL Not Set</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              You haven't set a website URL for this project yet. This won't affect the widget's functionality.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditClick(project?.id ?? '')}
            >
              Add URL
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Feedback
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedback.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageRating.toFixed(1)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Positive Feedback
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedback.filter((f) => (f.metadata?.rating || 0) > 3).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Last 7 Days
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                feedback.filter(
                  (f) =>
                    new Date(f.submitted_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {!hasWidget ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Widget Configuration Found</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>This project doesn't have a widget configured yet.</span>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/widget")}
            >
              Configure Widget
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Embed Script</CardTitle>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Script
                  </>
                )}
              </Button>
            </div>
            <CardDescription>
              Add this script to your website to start collecting feedback. The widget will work on any webpage where you add this script, regardless of the domain.{" "}
              <Link
                href="/documentation"
                className="text-primary hover:underline"
              >
                View documentation
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
                {getEmbedScript()}
              </pre>
              <div className="absolute right-2 top-2">
                <Code className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Quick Installation Steps:</h4>
              <ol className="list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Copy the script above</li>
                <li>Paste it just before the closing &lt;/body&gt; tag of your website</li>
                <li>The feedback widget will appear automatically on your site</li>
                <li>
                  For detailed instructions, check our{" "}
                  <Link
                    href="/documentation"
                    className="text-primary hover:underline"
                  >
                    documentation
                  </Link>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Feedback History</CardTitle>
            <Button onClick={downloadCSV} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
          <CardDescription>
            A list of feedback received from your users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {new Date(item.submitted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>{item.user_email}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {item.feedback_text}
                  </TableCell>
                  <TableCell>{item.metadata?.rating || "N/A"}</TableCell>
                </TableRow>
              ))}
              {feedback.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No feedback received yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 
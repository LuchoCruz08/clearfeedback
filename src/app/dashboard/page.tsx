/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/dashboard/ProjectCard";

interface Project {
  id: string;
  name: string;
  website_url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch projects",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProject() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("businesses")
        .insert([
          {
            user_id: user.id,
            name: projectName,
            website_url: websiteUrl,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      setIsCreateOpen(false);
      setProjectName("");
      setWebsiteUrl("");

      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project",
      });
    }
  }

  async function handleEditProject() {
    if (!selectedProject) return;

    try {
      const { error } = await supabase
        .from("businesses")
        .update({
          name: projectName,
          website_url: websiteUrl,
        })
        .eq("id", selectedProject.id);

      if (error) throw error;

      setProjects(
        projects.map((project) =>
          project.id === selectedProject.id
            ? { ...project, name: projectName, website_url: websiteUrl }
            : project
        )
      );

      setIsEditOpen(false);
      setSelectedProject(null);
      setProjectName("");
      setWebsiteUrl("");

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project",
      });
    }
  }

  async function handleDeleteProject(id: string) {
    try {
      const { error } = await supabase.from("businesses").delete().eq("id", id);

      if (error) throw error;

      setProjects(projects.filter((project) => project.id !== id));

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    }
  }

  function handleEditClick(id: string) {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
      setProjectName(project.name);
      setWebsiteUrl(project.website_url);
      setIsEditOpen(true);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your projects and their feedback
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to start collecting feedback from your users.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My Project"
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">
                  Website URL <span className="text-sm text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  You can add or update this later when your website is ready.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update your project details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Project Name</Label>
              <Input
                id="edit-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-url">Website URL</Label>
              <Input
                id="edit-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditProject}>Update Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onEdit={handleEditClick}
            onDelete={handleDeleteProject}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No projects yet. Create your first project!
          </p>
        </div>
      )}
    </div>
  );
}

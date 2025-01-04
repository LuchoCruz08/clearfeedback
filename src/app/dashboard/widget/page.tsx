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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WidgetPreview from "@/components/widget/WidgetPreview";

interface Project {
  id: string;
  name: string;
}

interface WidgetConfig {
  id?: string;
  business_id: string;
  position: string;
  theme: string;
  custom_css?: string;
  feedback_type: string;
  questions: Question[];
  show_emoji: boolean;
  show_rating: boolean;
  rating_scale: number;
  button_text: string;
  title_text: string;
}

interface Question {
  type: "text" | "multiple_choice";
  text: string;
  options?: string[];
  required: boolean;
}

export default function WidgetPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [config, setConfig] = useState<WidgetConfig>({
    business_id: "",
    position: "bottom-right",
    theme: "light",
    custom_css: "",
    feedback_type: "combined",
    questions: [],
    show_emoji: true,
    show_rating: true,
    rating_scale: 5,
    button_text: "Give Feedback",
    title_text: "Share Your Feedback",
  });
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("businesses")
        .select("id, name")
        .eq("user_id", user.id);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch projects",
      });
    }
  }

  async function handleProjectChange(projectId: string) {
    setSelectedProject(projectId);
    setConfig((prev) => ({ ...prev, business_id: projectId }));

    try {
      const { data, error } = await supabase
        .from("widget")
        .select("*")
        .eq("business_id", projectId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setConfig(data);
      } else {
        setConfig({
          business_id: projectId,
          position: "bottom-right",
          theme: "light",
          custom_css: "",
          feedback_type: "combined",
          questions: [],
          show_emoji: true,
          show_rating: true,
          rating_scale: 5,
          button_text: "Give Feedback",
          title_text: "Share Your Feedback",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch widget configuration",
      });
    }
  }

  async function saveWidget() {
    try {
      const { error } = await supabase
        .from("widget")
        .upsert({
          ...config,
          business_id: selectedProject,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Widget configuration saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save widget configuration",
      });
    }
  }

  function addQuestion() {
    setConfig((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          type: "text",
          text: "",
          required: true,
        },
      ],
    }));
  }

  function updateQuestion(index: number, updates: Partial<Question>) {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, ...updates } : q
      ),
    }));
  }

  function removeQuestion(index: number) {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Widget Configuration</h2>
        <p className="text-muted-foreground">
          Customize your feedback widget appearance and behavior
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Selection</CardTitle>
            <CardDescription>
              Select the project to configure the widget for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedProject}
              onValueChange={handleProjectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedProject && (
          <Tabs defaultValue="appearance">
            <TabsList>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select
                      value={config.position}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, position: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={config.theme}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, theme: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={config.button_text}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          button_text: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Title Text</Label>
                    <Input
                      value={config.title_text}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          title_text: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Custom CSS (Optional)</Label>
                    <Textarea
                      value={config.custom_css}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          custom_css: e.target.value,
                        }))
                      }
                      placeholder=".feedback-widget { /* your custom styles */ }"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.show_rating}
                      onCheckedChange={(checked) =>
                        setConfig((prev) => ({ ...prev, show_rating: checked }))
                      }
                    />
                    <Label>Enable Rating Scale</Label>
                  </div>

                  {config.show_rating && (
                    <div className="space-y-2">
                      <Label>Rating Scale</Label>
                      <Select
                        value={config.rating_scale.toString()}
                        onValueChange={(value) =>
                          setConfig((prev) => ({
                            ...prev,
                            rating_scale: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">1-5 Stars</SelectItem>
                          <SelectItem value="10">1-10 Scale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.show_emoji}
                      onCheckedChange={(checked) =>
                        setConfig((prev) => ({ ...prev, show_emoji: checked }))
                      }
                    />
                    <Label>Enable Emoji Reactions</Label>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Custom Questions</Label>
                      <Button onClick={addQuestion} variant="outline" size="sm">
                        Add Question
                      </Button>
                    </div>

                    {config.questions.map((question, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <div className="flex justify-between">
                          <Label>Question {index + 1}</Label>
                          <Button
                            onClick={() => removeQuestion(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                        <Select
                          value={question.type}
                          onValueChange={(value: "text" | "multiple_choice") =>
                            updateQuestion(index, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="multiple_choice">
                              Multiple Choice
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={question.text}
                          onChange={(e) =>
                            updateQuestion(index, { text: e.target.value })
                          }
                          placeholder="Question text"
                        />
                        {question.type === "multiple_choice" && (
                          <Textarea
                            value={question.options?.join("\n")}
                            onChange={(e) =>
                              updateQuestion(index, {
                                options: e.target.value.split("\n"),
                              })
                            }
                            placeholder="Enter options (one per line)"
                          />
                        )}
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={question.required}
                            onCheckedChange={(checked) =>
                              updateQuestion(index, { required: checked })
                            }
                          />
                          <Label>Required</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Preview</CardTitle>
                  <CardDescription>
                    Preview how your widget will look on your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[500px] relative">
                  <WidgetPreview config={config} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {selectedProject && (
          <Button onClick={saveWidget} className="w-full">
            Save Widget Configuration
          </Button>
        )}
      </div>
    </div>
  );
} 
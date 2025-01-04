/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, Smile, Meh, Frown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WidgetPreviewProps {
  config: {
    business_id: string;
    position: string;
    theme: string;
    custom_css?: string;
    show_emoji: boolean;
    show_rating: boolean;
    rating_scale: number;
    questions: Array<{
      type: string;
      text: string;
      options?: string[];
      required: boolean;
    }>;
    button_text: string;
    title_text: string;
  };
}

export default function WidgetPreview({ config }: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const positionStyles = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  const themeStyles = {
    light: {
      background: "white",
      text: "black",
    },
    dark: {
      background: "#1f2937",
      text: "white",
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomAnswer = (questionIndex: number, value: string) => {
    setCustomAnswers(prev => ({
      ...prev,
      [`question_${questionIndex + 1}`]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: config.business_id,
          name: formData.name,
          email: formData.email,
          feedback: formData.feedback,
          rating,
          emoji,
          customAnswers,
          metadata: {
            isPreview: true,
            screen_size: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      });

      // Reset form
      setFormData({ name: "", email: "", feedback: "" });
      setRating(0);
      setEmoji(null);
      setCustomAnswers({});
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit feedback",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg p-4">
      {!isOpen ? (
        <div
          style={{
            position: "absolute",
            ...positionStyles[config.position as keyof typeof positionStyles],
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            style={{
              background: themeStyles[config.theme as keyof typeof themeStyles]
                .background,
              color: themeStyles[config.theme as keyof typeof themeStyles].text,
            }}
          >
            {config.button_text}
          </Button>
        </div>
      ) : (
        <Card
          className="absolute w-[90%] max-w-md"
          style={{
            ...positionStyles[config.position as keyof typeof positionStyles],
            background:
              themeStyles[config.theme as keyof typeof themeStyles].background,
            color: themeStyles[config.theme as keyof typeof themeStyles].text,
          }}
        >
          <CardHeader>
            <CardTitle>{config.title_text}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {config.show_rating && (
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {Array.from({ length: config.rating_scale }).map((_, i) => (
                      <Button
                        key={i}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setRating(i + 1)}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            i < rating ? "fill-yellow-400" : "fill-none"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {config.show_emoji && (
                <div className="space-y-2">
                  <Label>How was your experience?</Label>
                  <div className="flex gap-2 justify-center">
                    {[
                      { icon: Smile, value: "happy" },
                      { icon: Meh, value: "neutral" },
                      { icon: Frown, value: "sad" },
                    ].map(({ icon: Icon, value }) => (
                      <Button
                        key={value}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEmoji(value)}
                        className={emoji === value ? "bg-blue-100" : ""}
                      >
                        <Icon className="h-6 w-6" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {config.questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label>
                    {question.text}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  {question.type === "text" ? (
                    <Textarea
                      placeholder="Your answer"
                      required={question.required}
                      onChange={(e) => handleCustomAnswer(index, e.target.value)}
                    />
                  ) : (
                    <RadioGroup
                      onValueChange={(value) => handleCustomAnswer(index, value)}
                    >
                      {question.options?.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}-${i}`}
                            required={question.required}
                          />
                          <Label htmlFor={`option-${index}-${i}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  id: string;
  name: string;
  website_url: string;
  created_at: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({
  id,
  name,
  website_url,
  created_at,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">
          {website_url}
        </CardDescription>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Created {new Date(created_at).toLocaleDateString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/projects/${id}`)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
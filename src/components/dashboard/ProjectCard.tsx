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
import {
  MoreVertical,
  Pencil,
  Trash,
  ExternalLink,
  BarChart2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  website_url: string | null;
  created_at: string;
  feedback_count: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({
  id,
  name,
  website_url,
  created_at,
  feedback_count,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-purple-800">
          {name}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
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
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {website_url && (
          <CardDescription className="text-sm text-purple-600 flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            <Link
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {website_url}
            </Link>
          </CardDescription>
        )}
        {!website_url && (
          <CardDescription className="text-sm text-gray-500 flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            No website URL provided
          </CardDescription>
        )}
        <div className="mt-4 flex flex-col space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{feedback_count} feedback items</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Created {new Date(created_at).toLocaleDateString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/dashboard/projects/${id}`)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

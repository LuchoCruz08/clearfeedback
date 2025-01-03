import { Mail, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="mb-8" />
        <div className="py-8 flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a
              href="mailto:lucianovcruz2004@gmail.com"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/lucianovcruz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ClearFeedback. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

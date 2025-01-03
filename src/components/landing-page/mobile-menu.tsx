"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isOpen ? "hidden" : "";
    }
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-gray-600 opacity-75"
        onClick={() => setIsOpen(false)}
      ></div>
      <nav className="absolute top-0 right-0 bottom-0 flex w-5/6 max-w-sm flex-col overflow-y-auto bg-white py-6 px-6 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">Menu</span>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-8">
          <Link
            href="/documentation"
            className="block py-2 text-base font-medium text-gray-900 hover:text-purple-600"
          >
            Documentation
          </Link>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-center mb-4">
            Login
          </Button>
          <Button className="w-full justify-center">Create Account</Button>
        </div>
      </nav>
    </div>
  );
}

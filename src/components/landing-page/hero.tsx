import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl animate-fade-in-down">
            <span className="block">Collect, Analyze, and Act on</span>
            <span className="block text-purple-600 mt-2">
              <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                Clear
              </span>
              <span className="inline-block transform hover:scale-110 transition-transform duration-200 delay-100">
                Feedback
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-8 md:max-w-3xl animate-fade-in-up">
            Empower your business with real-time insights. Our customizable
            widgets make collecting and analyzing customer feedback effortless.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 animate-fade-in">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:scale-105">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product mockup or illustration */}
        <div className="mt-20 relative animate-float">
          <Image
            src="/placeholder.svg"
            alt="Product mockup"
            width={1200}
            height={800}
            className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Zap, BarChart } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Start Collecting Valuable Feedback Today
          </h2>
          <p className="mt-4 text-xl text-purple-100 sm:text-2xl">
            Empower your business with real-time insights in minutes!
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <MessageCircle className="h-10 w-10 text-purple-100 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Customizable Widgets
              </h3>
              <p className="mt-2 text-purple-100">
                Tailor your feedback forms to match your brand
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <Zap className="h-10 w-10 text-purple-100 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Real-time Insights
              </h3>
              <p className="mt-2 text-purple-100">
                Get instant access to customer feedback
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
            <BarChart className="h-10 w-10 text-purple-100 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Advanced Analytics
              </h3>
              <p className="mt-2 text-purple-100">
                Make data-driven decisions with ease
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

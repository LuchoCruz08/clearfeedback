"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  MessageSquare,
  Code,
  PieChart,
  Settings,
  Download,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Customizable Widgets",
    description:
      "Create tailored feedback forms that match your brand and capture the insights you need.",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    description:
      "Get instant access to customer feedback and analytics as they come in.",
  },
  {
    icon: Code,
    title: "Easy Integration",
    description:
      "Seamlessly embed feedback widgets into your website with our simple script.",
  },
  {
    icon: PieChart,
    title: "Advanced Analytics",
    description:
      "Dive deep into your data with our powerful analytics and reporting tools.",
  },
  {
    icon: Settings,
    title: "Flexible Configuration",
    description:
      "Adjust your feedback collection strategy on the fly to meet your changing needs.",
  },
  {
    icon: Download,
    title: "CSV Export",
    description:
      "Download your feedback data in CSV format for easy analysis and reporting.",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Powerful Features for{" "}
            <span className="text-purple-600">Actionable Insights</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to collect, analyze, and act on customer
            feedback.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="relative z-10">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                  <feature.icon
                    className={`h-12 w-12 ${
                      hoveredIndex === index
                        ? "text-purple-600"
                        : "text-purple-500"
                    } transition-colors duration-300`}
                  />
                  <CardTitle className="text-2xl font-semibold text-gray-900 mt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

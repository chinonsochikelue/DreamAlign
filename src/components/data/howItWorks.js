import { ClipboardList, FileText, MessageCircleQuestion, TrendingUp } from "lucide-react";

export const howItWorks = [
  {
    title: "Seamless Onboarding",
    description: "Select your industry and skill level to receive tailored career support.",
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
  },
  {
    title: "Build Standout Documents",
    description: "Generate ATS-optimized resumes and impactful cover letters with ease.",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
  {
    title: "Master Interview Skills",
    description: "Sharpen your responses with role-specific, AI-driven mock interviews.",
    icon: <MessageCircleQuestion className="w-8 h-8 text-primary" />,
  },
  {
    title: "Measure Your Growth",
    description: "Gain insights through real-time performance tracking and analytics.",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
  },
];

'use client';

import { useEffect, useState } from "react";
import { getResume } from "@/actions/resume";
import ResumeBuilder from "./ResumeBuilder";

export default function ResumeBuilderWrapper() {
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resume = await getResume();
      setInitialContent(resume?.content ?? "");
    };

    fetchData();
  }, []);

  return <ResumeBuilder initialContent={initialContent} />;
}

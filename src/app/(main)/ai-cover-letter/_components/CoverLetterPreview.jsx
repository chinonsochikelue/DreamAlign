"use client";

import { MdEditor } from "md-editor-rt";
import 'md-editor-rt/lib/style.css';
import { useTheme } from "next-themes";
import React from "react";

const CoverLetterPreview = ({ content }) => {
  const theme = useTheme();

  return (
    <div data-color-mode={theme === "dark" ? "dark" : "light"} className="py-4">
      <MdEditor
        value={content}
        language="en-US"
        preview="preview"
        height={700}
        theme={theme === "dark" ? "dark" : "light"}
        className="rounded-md"
      />
    </div>
  );
};

export default CoverLetterPreview;

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  config: {
    tools: [{ googleSearch: {} }],
  },
});


// Fetch web data for real-time insights
const fetchWebResults = async (query) => {
  try {
    const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        q: query,
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.SEARCH_ENGINE_ID,
      },
    });
    console.log("Web data fetched successfully:", response.data);
    return response.data.items?.map((item) => item.snippet).join("\n") || "";
  } catch (error) {
    console.error("Error fetching web data:", error.response?.data || error.message || error);
    return "";
  }
};


export const fetchIndustryData = async (industry) => {
  const [webData] = await Promise.all([
    fetchWebResults(`current trends, courses, job listings, investment trend, industry challenges, salary and job openings in ${industry} industry`),
  ]);

  return {
    webData: webData.replace(/\n+/g, " ").trim(),
  };
};


export const generateAIInsights = async (industry) => {
  const { webData } = await fetchIndustryData(industry);
  if (!webData) {
    throw new Error("Failed to fetch web data");
  }
  // Prepare the prompt with fetched data
  const industryData = {
    webData,
  };
  // Generate insights using the AI model
  if (!industry) {
    throw new Error("Industry is required to generate insights");
  }

  const prompt = `
You're DreamAlign AI, a career coach expert and industry analyst.
Your task is to analyze the ${industry} industry and provide comprehensive insights based on the latest trends, salary data, courses, make an accurate prediction for investment trends from 2023 - current year: ${new Date().getFullYear()} if applicable, job openings, and skills required. Use the following data as context:
${JSON.stringify(industryData)}
Please provide the insights in the following JSON format:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
  "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],

  "marketTrends": [
    { "trend": "string", "impact": "High" | "Medium" | "Low" }
  ],
  "topRoles": [
    {
      "role": "string",
      "minSalary": number,
      "maxSalary": number,
      "medianSalary": number,
      "growthRate": "string",
      "location": "string",
      "description": "string"
    }
  ],
  "geographicalInsights": [
    {
      "region": "string",
      "topIndustry": "string",
      "jobDensity": "string",
      "growthRate": "string",
      "costOfLiving": "string",
      "averageSalary": number,
      "demandLevel": "High" | "Medium" | "Low",
      "keySkills": ["skill1", "skill2"]
    }
  ],
  "jobListings": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "salaryRange": { "min": number, "max": number },
      "postedDate": "YYYY-MM-DD",
      "description": "string",
      "url": "string",
      "requirements": ["requirement1", "requirement2"],
      "skills": ["skill1", "skill2"]
    }
  ],
  "learningSources": [
    {
      "title": "string",
      "type": "Course" | "Book" | "Article",
      "url": "string",
      "description": "string",
      "skillsCovered": ["skill1", "skill2"]
    }
  ],
  "industryChallenges": [
    {
      "challenge": "string",
      "impact": "High" | "Medium" | "Low",
      "solutions": ["solution1", "solution2"]
    }
  ],
  "investmentTrends": [
    {
      "year": number,
      "investmentType": "Venture Capital" | "Private Equity" | "Public Markets",
      "amount": number,
      "industry": "string"
    }
  ]
}

IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
Include at least 5 common roles for salary ranges.
Growth rate should be a percentage.
Include at least 5 skills and trends.
If you do not have enough data or are unsure, respond with empty or zero values rather than fabricating data.
Do NOT make up numbers or trends.
Make sure that the data are correct from the latest industry reports and trends.
Everything should be up-to-date and as of today's date.
`;

  const result = await model.generateContent(prompt, {
    tools: [{ googleSearch: {} }],
  });
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}
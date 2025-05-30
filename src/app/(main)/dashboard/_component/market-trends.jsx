"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Color map for investment types
const lineColors = {
    "Venture Capital": "#4f46e5",     // Indigo
    "Private Equity": "#10b981",      // Emerald
    "Public Markets": "#f59e0b",      // Amber
};

function MarketTrends({ data }) {
    // Group data by year, each year is a row, with keys for each investment type
    const groupedByYear = {};

    data.forEach((entry) => {
        const year = entry.year;
        if (!groupedByYear[year]) {
            groupedByYear[year] = { year };
        }
        groupedByYear[year][entry.investmentType] = {
            amount: entry.amount / 1_000_000,
            industry: entry.industry,
        };

    });

    const chartData = Object.values(groupedByYear).sort((a, b) => a.year - b.year);

    const investmentTypes = [...new Set(data.map((item) => item.investmentType))];

    const industry = data.length > 0 ? data[0].industry : "Unknown";

    return (
        <div>
            <Card className="border-none">
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis label={{ value: "Investment ($M)", angle: -90, position: "insideLeft" }} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white shadow-md">
                                                {payload.map((item) => {
                                                    const { value, name, payload: fullRow } = item;
                                                    const industry = fullRow[name]?.industry;
                                                    return (
                                                        <div key={name} className="font-semibold" style={{ color: item.stroke }}>
                                                            <p>{name}: ${value}M</p>
                                                        </div>
                                                    );
                                                })}
                                                <p className="text-normal text-gray-400">Industry: {industry}</p>
                                                <p className="font-normal text-gray-400">Year: {label}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />


                            <Legend />
                            {investmentTypes.map((type) => (
                                <Line
                                    key={type}
                                    type="monotone"
                                    dataKey={(d) => d[type]?.amount}
                                    stroke={lineColors[type] || "#8884d8"}
                                    name={type}
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    dot={{ r: 5 }}
                                />

                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default MarketTrends;

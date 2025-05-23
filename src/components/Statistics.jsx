import React from 'react';

function Statistics() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <Statistic value="50+" label="Industries Served" />
          <Statistic value="10K+" label="Curated Interview Questions" />
          <Statistic value="95%" label="User Success Rate" />
          <Statistic value="24/7" label="AI-Powered Assistance" />
        </div>
      </div>
    </section>
  );
}

function Statistic({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <h3 className="text-4xl font-bold">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export default Statistics;

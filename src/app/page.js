import Features from "@/components/Features";
import HeroSection from "@/components/Hero";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import Image from "next/image";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <div className="grid-background" />
      <HeroSection />

      <Features />

      <Statistics />

      <HowItWorks />

      <Testimonial />

      <FAQ />

      {/* CTA Section */}
      <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Take Control of Your Career Journey
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join thousands of ambitious professionals using DreamAlign to unlock new
              opportunities with smart, AI-driven career tools.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
}

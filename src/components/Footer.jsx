import { Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-muted-foreground text-md">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">DreamAlign</h2>
            <p>
              AI-powered tools and insights to help you align your ambition
              with real career outcomes.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Explore</h3>
            <ul className="space-y-1">
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="mailto:support@collabchron.com.ng" aria-label="Email">
                <Mail className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DreamAlign. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

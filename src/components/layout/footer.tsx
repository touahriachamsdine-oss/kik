import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:py-16">
        <div className="flex flex-col gap-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo />
          </Link>
          <p className="max-w-xs text-muted-foreground">
            Your next journey starts here. Discover and book amazing travel packages.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted text-muted-foreground py-4">
        <div className="container text-center text-sm">
          © {new Date().getFullYear()} رحلتي Trip Planner. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

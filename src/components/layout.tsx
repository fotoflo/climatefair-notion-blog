"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useCallback } from "react";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const siteUrl =
    (process.env.NEXT_PUBLIC_SITE_URL as string) || "https://climatefair.co";
  const logoUrl = `/Logo.png`;

  const { trackNavigation } = useGoogleAnalytics();

  const handleNavClick = useCallback(
    (linkText: string, href: string) => {
      trackNavigation(linkText, href);
    },
    [trackNavigation]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => handleNavClick("ClimateFair Logo", "/")}
              >
                <Image
                  src={logoUrl}
                  alt="ClimateFair"
                  width={160}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
              <Link
                href="/blog"
                className="bg-flexbike-teal text-white px-3 py-1.5 rounded-md font-medium transition-colors hover:bg-flexbike-teal/90"
                onClick={() => handleNavClick("Blog", "/blog")}
              >
                Blog
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/services"
                className="text-flexbike-teal hover:text-flexbike-teal/80 dark:text-flexbike-teal dark:hover:text-flexbike-teal/90 font-medium transition-colors"
                onClick={() => handleNavClick("Services", "/services")}
              >
                Services
              </Link>
              <Link
                href="mailto:team@climatefair.co"
                className="text-flexbike-teal hover:text-flexbike-teal/80 dark:text-flexbike-teal dark:hover:text-flexbike-teal/90 font-medium transition-colors"
                onClick={() =>
                  handleNavClick(
                    "Contact",
                    "mailto:team@climatefair.co"
                  )
                }
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/Logo.png"
                  alt="ClimateFair"
                  width={140}
                  height={40}
                  className="h-8 w-auto mb-4"
                />
              </Link>
              <p className="text-muted-foreground text-sm max-w-md">
                ClimateFair empowers climate businesses through strategic
                sourcing, franchise opportunities, and innovative crowd
                funding solutions. Building a sustainable future, one business
                at a time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() => handleNavClick("Footer Home", "/")}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() => handleNavClick("Footer Blog", "/blog")}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() =>
                      handleNavClick(
                        "Footer Services",
                        "/services"
                      )
                    }
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:team@climatefair.co"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() =>
                      handleNavClick(
                        "Footer Contact",
                        "mailto:team@climatefair.co"
                      )
                    }
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() =>
                      handleNavClick(
                        "Footer Privacy Policy",
                        "/privacy"
                      )
                    }
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 text-sm transition-colors"
                    onClick={() =>
                      handleNavClick(
                        "Footer Terms",
                        "/terms"
                      )
                    }
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} ClimateFair. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-muted-foreground text-sm">
                  Follow us:
                </span>
                <a
                  href="mailto:team@climatefair.co"
                  className="text-muted-foreground hover:text-flexbike-teal dark:hover:text-flexbike-teal/90 transition-colors"
                  onClick={() =>
                    handleNavClick("Email Contact", "mailto:team@climatefair.co")
                  }
                >
                  <span className="sr-only">Email</span>
                  ✉️
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

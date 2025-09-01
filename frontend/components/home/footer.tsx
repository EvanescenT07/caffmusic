"use client";

import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FooterList } from "@/types/type";

const FooterData: FooterList = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "How it Works", href: "/#workflow" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Frontend",
        href: "https://github.com/EvanescenT07/caffmusic-frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/EvanescenT07/caffmusic-backend",
      },
      {
        label: "Support",
        href: "mailto:zulfikarahmadaliansyah12@gmail.com",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-muted/10">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#383838] dark:text-[#ccc]">
              CaffMusic
            </h3>
            <p className="text-sm text-muted-foreground">
              Music genre detection powered by machine learning.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/EvanescenT07/caffmusic-frontend"
                className="text-muted-foreground hover:text-[#383838] dark:hover:text-[#ccc]"
              >
                <FiGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="mailto:zulfikarahmadaliansyah12@gmail.com"
                className="text-muted-foreground hover:text-[#383838] dark:hover:text-[#ccc]"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          {FooterData.map((footer, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold text-[#383838] dark:text-[#ccc]">
                {footer.title}
              </h3>
              <ul className="space-y-2">
                {footer.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#383838] dark:hover:text-[#ccc]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CaffMusic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

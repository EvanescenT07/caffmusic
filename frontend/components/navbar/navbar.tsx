"use client";

import { FloatingNavbarProps } from "@/types/type";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme/toggle-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { userHook } from "@/hooks/userhooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FloatingNavbar = ({ navItems, className }: FloatingNavbarProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const user = userHook();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 mx-auto max-w-fit z-[40] px-4 py-2 space-x-4",
        "items-center justify-between sm:justify-center",
        "rounded-full border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-background/70 backdrop-blur-md shadow-md",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {/* Desktop nav: tampil hanya di sm ke atas */}
        <div className="hidden sm:flex items-center space-x-4">
          {navItems.map((content, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={content.link}
              className="capitalize text-sm sm:text-base font-medium text-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838] rounded-full px-4 py-2 flex items-center gap-2"
            >
              <span className="text-sm">{content.name}</span>
            </Link>
          ))}
          {/* Login/Logout Button hanya di desktop */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-full px-4"
                >
                  <UserIcon className="w-5 h-5 dark:text-[#ccc] text-[#383838]" />
                  <span className="hidden sm:inline dark:text-[#ccc] text-[#383838]">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838]"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              size="sm"
              className="rounded-full px-4 hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838]"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile nav trigger: tampil hanya di bawah sm */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-[#ccc] dark:hover:bg-[#383838] dark:hover:text-[#ccc] hover:text-[#383838]">
            {isSheetOpen ? (
              <X className="w-5 h-5 hover:text-[#ccc] dark:hover:text-[#383838]" />
            ) : (
              <Menu className="w-5 h-5 dark:hover:text-[#ccc] hover:text-[#383838]" />
            )}
          </SheetTrigger>
          <SheetContent
            className="flex flex-col z-50 bg-background/70 dark:bg-transparent backdrop-blur-md shadow-md rounded-2xl border border-black/10 dark:border-white/10"
            onInteractOutside={() => setIsSheetOpen(false)}
          >
            <SheetTitle className="mt-24 mb-24 text-center text-2xl font-bold text-[#383838] dark:text-[#ccc]">
              CaffMusic
            </SheetTitle>
            <nav className="flex flex-col items-center space-y-4">
              {navItems.map((content, idx: number) => (
                <Link
                  key={`sheet-link=${idx}`}
                  href={content.link}
                  className="capitalize text-base font-medium text-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838] rounded-full px-4 py-2 flex items-center gap-2"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <span className="text-sm">{content.name}</span>
                </Link>
              ))}

              {/* Login/Logout hanya di mobile */}
              {user ? (
                <div className="w-full flex flex-col items-center mt-4">
                  <span className="font-semibold text-base mb-2">
                    {user.name || user.email}
                  </span>
                  <Button
                    onClick={() => {
                      setIsSheetOpen(false);
                      handleLogout();
                    }}
                    size="sm"
                    className="w-full rounded-full hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838]"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setIsSheetOpen(false);
                    router.push("/login");
                  }}
                  size="sm"
                  className="w-full rounded-full hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838] mt-4"
                >
                  Login
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FloatingNavbar;

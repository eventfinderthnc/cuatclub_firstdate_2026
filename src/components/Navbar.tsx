"use client";

import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { List, Home, MapPinned } from "lucide-react";

const NAV_ITEMS = [
  { href: "/explore", label: "Explore", icon: List },
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: MapPinned },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <ul className="relative flex items-center gap-2 rounded-full bg-background/30 p-2 shadow-[0_0_24px_var(--color-shadow-black)] backdrop-blur-md">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <button
                type="button"
                onClick={() => router.push(href)}
                aria-current={isActive ? "page" : undefined}
                className="relative flex items-center gap-2 rounded-full px-6 py-3"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full border border-border bg-primary"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-foreground"
                  }`}
                >
                  <Icon size={24} strokeWidth={2} />
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap text-lg font-medium"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

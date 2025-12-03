"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => ["automation", "agentic AI", "efficiency", "knowledge", "real solutions"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          {/* Badge */}
          <div>
            <Button variant="secondary" size="sm" className="gap-2" asChild>
              <Link href="/about">
                <Sparkles className="w-4 h-4" />
                Powered by Arcus Automations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Animated Title */}
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-bold text-slate-900 dark:text-white">
              <span className="block">Grow Your Business</span>
              <span className="block">With</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 h-[1.2em]">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? "-150%" : "150%",
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="block">Arcus Online</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-slate-600 dark:text-slate-400 max-w-2xl text-center mt-4">
              Master the latest AI tech with access to our online platform and real-world use cases. 
              Stay ahead with cutting-edge AI tools and techniques designed for 2026. 
              Learn from experts that have built real solutions for businesses like yours.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row gap-3 flex-wrap justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Start Learning Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-2" variant="outline" asChild>
              <Link href="/contact">
                Schedule Consultation
                <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-indigo-500 dark:border-slate-900"
                />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                Over 340
              </span>{" "}
              professionals already learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


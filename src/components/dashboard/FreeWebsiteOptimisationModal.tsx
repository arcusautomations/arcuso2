"use client";

import { useState } from "react";
import { Globe, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface FreeWebsiteOptimisationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FreeWebsiteOptimisationModal({
  open,
  onOpenChange,
}: FreeWebsiteOptimisationModalProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleContinue = () => {
    if (selectedOption === "has-website") {
      router.push("/free-website-optimisation/existing");
    } else if (selectedOption === "no-website") {
      router.push("/free-website-optimisation/new");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <DialogTitle className="text-xl">Free Website Optimisation</DialogTitle>
          </div>
          <DialogDescription>
            Let&apos;s get started with optimizing your online presence. First, tell us about your current situation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            <div className="flex items-start space-x-3 space-y-0 rounded-lg border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <RadioGroupItem value="has-website" id="has-website" className="mt-1" />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="has-website"
                  className="font-semibold text-slate-900 dark:text-white cursor-pointer"
                >
                  I currently have a website
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get a free audit and optimization recommendations for your existing site
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0 rounded-lg border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <RadioGroupItem value="no-website" id="no-website" className="mt-1" />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="no-website"
                  className="font-semibold text-slate-900 dark:text-white cursor-pointer"
                >
                  I don&apos;t have a website
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get a free, professionally built 5-page website for your business
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


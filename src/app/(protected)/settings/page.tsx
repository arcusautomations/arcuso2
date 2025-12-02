"use client";

import { useState, useEffect } from "react";
import { Shield, Bell, Moon, Sun, Monitor, Trash2, User, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { profileUpdateSchema, type ProfileUpdateFormData } from "@/lib/validation/profile";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    updates: true,
  });
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dateOfBirth: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingPersonalInfo, setIsSavingPersonalInfo] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Load user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const { profile } = await response.json();
          setPersonalInfo({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            mobileNumber: profile.mobile_number || "",
            dateOfBirth: profile.date_of_birth || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSavePersonalInfo = async () => {
    setIsSavingPersonalInfo(true);
    setFieldErrors({});

    const validation = profileUpdateSchema.safeParse({
      firstName: personalInfo.firstName || null,
      lastName: personalInfo.lastName || null,
      mobileNumber: personalInfo.mobileNumber || null,
      dateOfBirth: personalInfo.dateOfBirth || null,
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      setIsSavingPersonalInfo(false);
      return;
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error || "Failed to update personal information");
        setIsSavingPersonalInfo(false);
        return;
      }

      toast.success("Personal information updated successfully");
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSavingPersonalInfo(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Preferences updated");
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* User Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details (email address cannot be changed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingProfile ? (
            <div className="space-y-4">
              <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    error={!!fieldErrors.firstName}
                    icon={<User className="h-5 w-5" />}
                  />
                  {fieldErrors.firstName && (
                    <p className="text-sm text-red-600">{fieldErrors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    error={!!fieldErrors.lastName}
                    icon={<User className="h-5 w-5" />}
                  />
                  {fieldErrors.lastName && (
                    <p className="text-sm text-red-600">{fieldErrors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={personalInfo.mobileNumber}
                  onChange={(e) => handlePersonalInfoChange("mobileNumber", e.target.value)}
                  placeholder="+61 4XX XXX XXX"
                  error={!!fieldErrors.mobileNumber}
                  icon={<Phone className="h-5 w-5" />}
                />
                {fieldErrors.mobileNumber && (
                  <p className="text-sm text-red-600">{fieldErrors.mobileNumber}</p>
                )}
                <p className="text-xs text-slate-500">
                  Include country code (e.g., +61 for Australia)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
                  error={!!fieldErrors.dateOfBirth}
                  icon={<Calendar className="h-5 w-5" />}
                />
                {fieldErrors.dateOfBirth && (
                  <p className="text-sm text-red-600">{fieldErrors.dateOfBirth}</p>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSavePersonalInfo}
                  disabled={isSavingPersonalInfo}
                  isLoading={isSavingPersonalInfo}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the app looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    theme === option.value
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                  }`}
                >
                  <option.icon
                    className={`h-6 w-6 ${
                      theme === option.value
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      theme === option.value
                        ? "text-violet-900 dark:text-violet-100"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="text-base">
                Email Notifications
              </Label>
              <p className="text-sm text-slate-500">
                Receive notifications about your account activity
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange("email")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="product-updates" className="text-base">
                Product Updates
              </Label>
              <p className="text-sm text-slate-500">
                Get notified about new features and improvements
              </p>
            </div>
            <Switch
              id="product-updates"
              checked={notifications.updates}
              onCheckedChange={() => handleNotificationChange("updates")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing" className="text-base">
                Marketing Emails
              </Label>
              <p className="text-sm text-slate-500">
                Receive tips, tutorials, and promotional content
              </p>
            </div>
            <Switch
              id="marketing"
              checked={notifications.marketing}
              onCheckedChange={() => handleNotificationChange("marketing")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Change Password
              </p>
              <p className="text-sm text-slate-500">
                Update your password regularly for better security
              </p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-slate-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Delete Account
              </p>
              <p className="text-sm text-slate-500">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action
                    cannot be undone. All your data, including courses progress
                    and projects, will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast.error("Account deletion is disabled in demo mode");
                      setDeleteDialogOpen(false);
                    }}
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




// Re-export all types for convenient imports
export * from "./database";

/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * User session type (from Supabase Auth)
 */
export interface UserSession {
  id: string;
  email: string;
  emailVerified: boolean;
  profile: {
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    mobileNumber: string | null;
    dateOfBirth: string | null;
    avatarUrl: string | null;
    company: string | null;
    role: string | null;
    onboardingCompleted: boolean;
  } | null;
}

/**
 * Navigation item type
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
}

/**
 * Dashboard stats type
 */
export interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalProjects: number;
  activeProjects: number;
}

/**
 * Resource with progress type
 */
export interface ResourceWithProgress {
  id: string;
  title: string;
  description: string | null;
  type: "course" | "guide" | "template" | "tool";
  category: string;
  thumbnailUrl: string | null;
  durationMinutes: number | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  isPremium: boolean;
  progress: number;
  completed: boolean;
  lastAccessedAt: string | null;
}

/**
 * Form state type for React hook form
 */
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

/**
 * Toast notification type
 */
export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}




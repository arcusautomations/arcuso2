/**
 * Database types generated from Supabase schema
 * These types provide type safety for all database operations
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          company: string | null;
          role: string | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          role?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          role?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: "active" | "completed" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          status?: "active" | "completed" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          status?: "active" | "completed" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          type: "course" | "guide" | "template" | "tool";
          category: string;
          content_url: string | null;
          thumbnail_url: string | null;
          duration_minutes: number | null;
          difficulty: "beginner" | "intermediate" | "advanced";
          is_premium: boolean;
          price_cents: number | null;
          order_index: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          type: "course" | "guide" | "template" | "tool";
          category: string;
          content_url?: string | null;
          thumbnail_url?: string | null;
          duration_minutes?: number | null;
          difficulty?: "beginner" | "intermediate" | "advanced";
          is_premium?: boolean;
          price_cents?: number | null;
          order_index?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          type?: "course" | "guide" | "template" | "tool";
          category?: string;
          content_url?: string | null;
          thumbnail_url?: string | null;
          duration_minutes?: number | null;
          difficulty?: "beginner" | "intermediate" | "advanced";
          is_premium?: boolean;
          price_cents?: number | null;
          order_index?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_resource_progress: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          progress_percent: number;
          completed_at: string | null;
          last_accessed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          progress_percent?: number;
          completed_at?: string | null;
          last_accessed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          progress_percent?: number;
          completed_at?: string | null;
          last_accessed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_resource_progress_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_resource_progress_resource_id_fkey";
            columns: ["resource_id"];
            referencedRelation: "resources";
            referencedColumns: ["id"];
          }
        ];
      };
      user_purchases: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          stripe_payment_id: string | null;
          amount_cents: number;
          currency: string;
          status: "pending" | "completed" | "refunded" | "failed";
          purchased_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          stripe_payment_id?: string | null;
          amount_cents: number;
          currency?: string;
          status?: "pending" | "completed" | "refunded" | "failed";
          purchased_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          stripe_payment_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: "pending" | "completed" | "refunded" | "failed";
          purchased_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_purchases_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_purchases_resource_id_fkey";
            columns: ["resource_id"];
            referencedRelation: "resources";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      project_status: "active" | "completed" | "archived";
      resource_type: "course" | "guide" | "template" | "tool";
      difficulty_level: "beginner" | "intermediate" | "advanced";
      purchase_status: "pending" | "completed" | "refunded" | "failed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience type aliases for common database operations
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type Resource = Database["public"]["Tables"]["resources"]["Row"];
export type ResourceInsert = Database["public"]["Tables"]["resources"]["Insert"];
export type ResourceUpdate = Database["public"]["Tables"]["resources"]["Update"];

export type UserResourceProgress = Database["public"]["Tables"]["user_resource_progress"]["Row"];
export type UserResourceProgressInsert = Database["public"]["Tables"]["user_resource_progress"]["Insert"];
export type UserResourceProgressUpdate = Database["public"]["Tables"]["user_resource_progress"]["Update"];

export type UserPurchase = Database["public"]["Tables"]["user_purchases"]["Row"];
export type UserPurchaseInsert = Database["public"]["Tables"]["user_purchases"]["Insert"];
export type UserPurchaseUpdate = Database["public"]["Tables"]["user_purchases"]["Update"];

// Enum types
export type ProjectStatus = Database["public"]["Enums"]["project_status"];
export type ResourceType = Database["public"]["Enums"]["resource_type"];
export type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];
export type PurchaseStatus = Database["public"]["Enums"]["purchase_status"];



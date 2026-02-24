/**
 * Supabase Database Types
 * Generated from supabase/schema.sql
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          nickname: string;
          profile_image_url: string | null;
          level: number;
          role: "user" | "admin";
          status: "active" | "suspended" | "banned";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "level" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      pets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          breed_id: string | null;
          breed_name: string | null;
          age: string | null;
          profile_image_url: string | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pets"]["Row"], "id" | "is_primary" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["pets"]["Insert"]>;
      };
      breeds: {
        Row: {
          id: string;
          category: "dog" | "cat";
          name_ko: string;
          name_en: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["breeds"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["breeds"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          pet_id: string | null;
          description: string | null;
          location: string | null;
          view_count: number;
          like_count: number;
          status: "published" | "hidden" | "reported" | "deleted";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["posts"]["Row"], "id" | "view_count" | "like_count" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      post_images: {
        Row: {
          id: string;
          post_id: string;
          url: string;
          thumbnail_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["post_images"]["Row"], "id" | "sort_order" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["post_images"]["Insert"]>;
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["likes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["likes"]["Insert"]>;
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["follows"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["follows"]["Insert"]>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["comments"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: "like" | "comment" | "follow" | "mention";
          actor_id: string | null;
          post_id: string | null;
          comment_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "is_read" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          usage_count: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tags"]["Row"], "id" | "usage_count" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: Database["public"]["Tables"]["post_tags"]["Row"];
        Update: Partial<Database["public"]["Tables"]["post_tags"]["Insert"]>;
      };
      reports: {
        Row: {
          id: string;
          post_id: string;
          reporter_id: string;
          reason: string;
          status: "pending" | "reviewed" | "dismissed";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reports"]["Row"], "id" | "status" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
      };
    };
  };
}

// 타입 별칭
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Pet = Database["public"]["Tables"]["pets"]["Row"];
export type Breed = Database["public"]["Tables"]["breeds"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostImage = Database["public"]["Tables"]["post_images"]["Row"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type PostTag = Database["public"]["Tables"]["post_tags"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];

// 조인된 타입 (API 응답용)
export interface PostWithDetails extends Post {
  author: Pick<Profile, "id" | "nickname" | "profile_image_url" | "level">;
  pet: Pick<Pet, "name" | "breed_name" | "age"> | null;
  images: Pick<PostImage, "url" | "thumbnail_url">[];
  liked_by_me?: boolean;
}

export interface RankingItemWithDetails {
  rank: number;
  post: PostWithDetails;
}

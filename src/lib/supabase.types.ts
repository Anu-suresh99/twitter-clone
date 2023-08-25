export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmark: {
        Row: {
          created_at: string
          id: string
          tweetid: string | null
          userid: string | null
        }
        Insert: {
          created_at?: string
          id: string
          tweetid?: string | null
          userid?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          tweetid?: string | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_tweetid_fkey"
            columns: ["tweetid"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_userid_fkey"
            columns: ["userid"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      hashtag: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      hashtag_tweet: {
        Row: {
          hashtagid: string
          tweetid: string
        }
        Insert: {
          hashtagid: string
          tweetid: string
        }
        Update: {
          hashtagid?: string
          tweetid?: string
        }
        Relationships: [
          {
            foreignKeyName: "hashtag_tweet_hashtagid_fkey"
            columns: ["hashtagid"]
            referencedRelation: "hashtag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hashtag_tweet_tweetid_fkey"
            columns: ["tweetid"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          created_at: string
          id: string
          tweetid: string | null
          userid: string | null
        }
        Insert: {
          created_at?: string
          id: string
          tweetid?: string | null
          userid?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          tweetid?: string | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "like_tweetid_fkey"
            columns: ["tweetid"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_userid_fkey"
            columns: ["userid"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          full_name?: string | null
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reply: {
        Row: {
          id: string
          replyid: string | null
          text: string | null
          tweetid: string | null
          userid: string | null
        }
        Insert: {
          id: string
          replyid?: string | null
          text?: string | null
          tweetid?: string | null
          userid?: string | null
        }
        Update: {
          id?: string
          replyid?: string | null
          text?: string | null
          tweetid?: string | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reply_tweetid_fkey"
            columns: ["tweetid"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_userid_fkey"
            columns: ["userid"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tweet: {
        Row: {
          authorid: string | null
          created_at: string
          id: string
          text: string | null
          updated_at: string
        }
        Insert: {
          authorid?: string | null
          created_at?: string
          id: string
          text?: string | null
          updated_at?: string
        }
        Update: {
          authorid?: string | null
          created_at?: string
          id?: string
          text?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

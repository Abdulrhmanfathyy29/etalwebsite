export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          icon_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['product_categories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['product_categories']['Insert']>
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          short_desc: string | null
          description: string
          primary_image: string | null
          image_gallery: string[]
          features: string[]
          datasheet_url: string | null
          certifications: string[]
          standards: string[]
          is_active: boolean
          is_featured: boolean
          sort_order: number
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      product_specs: {
        Row: {
          id: string
          product_id: string
          spec_group: string | null
          spec_key: string
          spec_value: string
          spec_unit: string | null
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['product_specs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['product_specs']['Insert']>
      }
      sectors: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          body: string | null
          image_url: string | null
          icon_url: string | null
          sort_order: number
          is_active: boolean
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['sectors']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['sectors']['Insert']>
      }
      product_sectors: {
        Row: {
          product_id: string
          sector_id: string
        }
        Insert: Database['public']['Tables']['product_sectors']['Row']
        Update: Partial<Database['public']['Tables']['product_sectors']['Row']>
      }
      download_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['download_categories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['download_categories']['Insert']>
      }
      downloads: {
        Row: {
          id: string
          title: string
          description: string | null
          category_id: string | null
          product_id: string | null
          file_type: 'datasheet' | 'manual' | 'certificate' | 'drawing' | 'catalog' | 'other'
          file_url: string
          file_name: string
          file_size_bytes: number | null
          mime_type: string | null
          is_public: boolean
          download_count: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['downloads']['Row'], 'id' | 'created_at' | 'updated_at' | 'download_count'>
        Update: Partial<Database['public']['Tables']['downloads']['Insert']>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          phone: string | null
          country: string | null
          subject: string
          message: string
          product_id: string | null
          status: 'unread' | 'read' | 'replied' | 'archived'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'status'>
        Update: Partial<Database['public']['Tables']['contact_messages']['Row']>
      }
      site_content: {
        Row: {
          id: string
          section: string
          key: string
          value: string | null
          type: 'text' | 'html' | 'image_url' | 'json'
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      file_type: 'datasheet' | 'manual' | 'certificate' | 'drawing' | 'catalog' | 'other'
      contact_status: 'unread' | 'read' | 'replied' | 'archived'
      content_type: 'text' | 'html' | 'image_url' | 'json'
    }
  }
}

// Convenience row types
export type ProductCategory = Database['public']['Tables']['product_categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductSpec = Database['public']['Tables']['product_specs']['Row']
export type Sector = Database['public']['Tables']['sectors']['Row']
export type Download = Database['public']['Tables']['downloads']['Row']
export type DownloadCategory = Database['public']['Tables']['download_categories']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

// Extended types with joins
export type ProductWithCategory = Product & {
  category: ProductCategory
}

export type ProductWithDetails = Product & {
  category: ProductCategory
  specs: ProductSpec[]
  sectors: Sector[]
  downloads: Download[]
}

export type DownloadWithCategory = Download & {
  category: DownloadCategory | null
  product: Pick<Product, 'id' | 'name' | 'slug'> | null
}

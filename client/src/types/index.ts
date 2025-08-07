export interface Guest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  country: string;
  rsvp_token: string;
  rsvp_status: 'pending' | 'confirmed' | 'declined';
  hotel_id?: number;
  arrival_time?: string;
  departure_time?: string;
  notes?: string;
  needs_pickup: boolean;
  flight_details?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  venue_id: number;
  venue?: Venue;
  dress_code?: string;
  type: 'wedding' | 'reception' | 'mehndi' | 'engagement' | 'after_party';
  is_live_streamed: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  phone?: string;
  google_maps_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  description?: string;
  price_per_night?: number;
  created_at: string;
  updated_at: string;
}

export interface RSVP {
  id: number;
  guest_id: number;
  event_id: number;
  response: 'attending' | 'not_attending' | 'maybe';
  num_attendees: number;
  dietary_preferences?: string;
  special_requests?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaGallery {
  id: number;
  title: string;
  description?: string;
  type: 'image' | 'video';
  album: string;
  file_path: string;
  thumbnail_path?: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  sort_order: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface LiveStream {
  id: number;
  event_id: number;
  platform: 'youtube' | 'vimeo' | 'facebook' | 'instagram';
  embed_link: string;
  stream_url?: string;
  is_active: boolean;
  is_live: boolean;
  scheduled_start?: string;
  actual_start?: string;
  actual_end?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'resolved';
  admin_notes?: string;
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface RSVPFormData {
  token: string;
  responses: {
    event_id: number;
    response: 'attending' | 'not_attending' | 'maybe';
    num_attendees: number;
    dietary_preferences?: string;
    special_requests?: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
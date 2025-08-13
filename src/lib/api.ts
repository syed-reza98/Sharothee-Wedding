import axios, { AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  PaginatedResponse, 
  Event, 
  Venue, 
  Guest, 
  Hotel, 
  RSVP, 
  MediaGallery, 
  LiveStream, 
  ContactRequest, 
  User, 
  RSVPFormData, 
  ContactFormData 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Events
  getEvents: () => apiClient.get<ApiResponse<Event[]>>('/events'),
  getEvent: (id: number) => apiClient.get<ApiResponse<Event>>(`/events/${id}`),
  
  // Venues
  getVenues: () => apiClient.get<ApiResponse<Venue[]>>('/venues'),
  getVenue: (id: number) => apiClient.get<ApiResponse<Venue>>(`/venues/${id}`),
  
  // Gallery
  getGallery: (album?: string) => {
    const params = album ? { album } : {};
    return apiClient.get<ApiResponse<MediaGallery[]>>('/gallery', { params });
  },
  getGalleryAlbums: () => apiClient.get<ApiResponse<string[]>>('/gallery/albums'),
  
  // RSVP
  submitRSVP: (data: RSVPFormData) => apiClient.post<ApiResponse<RSVP[]>>('/rsvp', data),
  getRSVPByToken: (token: string) => apiClient.get<ApiResponse<{ guest: Guest; rsvps: RSVP[]; events: Event[] }>>(`/rsvp/${token}`),
  
  // Contact
  submitContact: (data: ContactFormData) => apiClient.post<ApiResponse<ContactRequest>>('/contact', data),
  
  // Live Streams
  getLiveStreams: () => apiClient.get<ApiResponse<LiveStream[]>>('/live-streams'),
  getLiveStreamByEvent: (eventId: number) => apiClient.get<ApiResponse<LiveStream>>(`/live-streams/event/${eventId}`),
  
  // Hotels
  getHotels: () => apiClient.get<ApiResponse<Hotel[]>>('/hotels'),
  
  // Admin APIs (Protected)
  admin: {
    // Authentication
    login: (email: string, password: string) => 
      apiClient.post<ApiResponse<{ user: User; token: string }>>('/admin/login', { email, password }),
    logout: () => apiClient.post<ApiResponse<null>>('/admin/logout'),
    me: () => apiClient.get<ApiResponse<User>>('/admin/me'),
    
    // Guests Management
    getGuests: (page = 1, perPage = 15) => 
      apiClient.get<PaginatedResponse<Guest>>('/admin/guests', { params: { page, per_page: perPage } }),
    createGuest: (data: Partial<Guest>) => apiClient.post<ApiResponse<Guest>>('/admin/guests', data),
    updateGuest: (id: number, data: Partial<Guest>) => apiClient.put<ApiResponse<Guest>>(`/admin/guests/${id}`, data),
    deleteGuest: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/guests/${id}`),
    
    // Events Management
    createEvent: (data: Partial<Event>) => apiClient.post<ApiResponse<Event>>('/admin/events', data),
    updateEvent: (id: number, data: Partial<Event>) => apiClient.put<ApiResponse<Event>>(`/admin/events/${id}`, data),
    deleteEvent: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/events/${id}`),
    
    // Venues Management
    createVenue: (data: Partial<Venue>) => apiClient.post<ApiResponse<Venue>>('/admin/venues', data),
    updateVenue: (id: number, data: Partial<Venue>) => apiClient.put<ApiResponse<Venue>>(`/admin/venues/${id}`, data),
    deleteVenue: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/venues/${id}`),
    
    // Hotels Management
    createHotel: (data: Partial<Hotel>) => apiClient.post<ApiResponse<Hotel>>('/admin/hotels', data),
    updateHotel: (id: number, data: Partial<Hotel>) => apiClient.put<ApiResponse<Hotel>>(`/admin/hotels/${id}`, data),
    deleteHotel: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/hotels/${id}`),
    
    // Media Gallery Management
    uploadMedia: (formData: FormData) => apiClient.post<ApiResponse<MediaGallery>>('/admin/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    updateMedia: (id: number, data: Partial<MediaGallery>) => apiClient.put<ApiResponse<MediaGallery>>(`/admin/media/${id}`, data),
    deleteMedia: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/media/${id}`),
    approveMedia: (id: number) => apiClient.patch<ApiResponse<MediaGallery>>(`/admin/media/${id}/approve`),
    
    // RSVP Management
    getRSVPs: (page = 1, perPage = 15) => 
      apiClient.get<PaginatedResponse<RSVP & { guest: Guest; event: Event }>>('/admin/rsvps', { params: { page, per_page: perPage } }),
    updateRSVP: (id: number, data: Partial<RSVP>) => apiClient.put<ApiResponse<RSVP>>(`/admin/rsvps/${id}`, data),
    
    // Live Streams Management
    createLiveStream: (data: Partial<LiveStream>) => apiClient.post<ApiResponse<LiveStream>>('/admin/live-streams', data),
    updateLiveStream: (id: number, data: Partial<LiveStream>) => apiClient.put<ApiResponse<LiveStream>>(`/admin/live-streams/${id}`, data),
    deleteLiveStream: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/live-streams/${id}`),
    
    // Contact Requests Management
    getContactRequests: (page = 1, perPage = 15) => 
      apiClient.get<PaginatedResponse<ContactRequest>>('/admin/contact-requests', { params: { page, per_page: perPage } }),
    updateContactRequest: (id: number, data: Partial<ContactRequest>) => apiClient.put<ApiResponse<ContactRequest>>(`/admin/contact-requests/${id}`, data),
    
    // Analytics
    getDashboardStats: () => apiClient.get<ApiResponse<{
      total_guests: number;
      confirmed_rsvps: number;
      pending_rsvps: number;
      total_events: number;
      total_media: number;
      pending_contacts: number;
    }>>('/admin/dashboard/stats'),
  }
};

export default api;
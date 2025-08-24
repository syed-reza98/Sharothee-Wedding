import { z } from "zod"

// RSVP Validation
export const rsvpSchema = z.object({
  guestId: z.string().min(1, "Guest ID is required"),
  eventId: z.string().min(1, "Event ID is required"),
  response: z.enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"]),
  attendees: z.number().min(1).max(10),
  dietaryPreferences: z.string().optional(),
  comments: z.string().optional(),
})

export const rsvpTokenSchema = z.object({
  token: z.string().min(6, "Token must be at least 6 characters"),
})

// Contact Form Validation
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(["RSVP", "TRAVEL", "EVENTS", "DIETARY", "ACCESSIBILITY", "GENERAL", "EMERGENCY"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// RSVP Form Validation
  guestName: z.string().min(1, "Guest name is required"),
  email: z.string().email("Please enter a valid email address"),
  willAttendDhaka: z.enum(["yes", "no", "maybe"]),
  familySide: z.enum(["bride", "groom", "both"]),
  guestCount: z.enum(["1", "2", "3", "4", "other"]),
  guestCountOther: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Contact Information
  preferredNumber: z.string().optional(),
  preferredWhatsapp: z.boolean().optional(),
  preferredBotim: z.boolean().optional(),
  secondaryNumber: z.string().optional(),
  secondaryWhatsapp: z.boolean().optional(),
  secondaryBotim: z.boolean().optional(),
  
  // Emergency Contact
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  emergencyEmail: z.string().email().optional().or(z.literal("")),
}).refine((data) => {
  if (data.guestCount === "other" && !data.guestCountOther) {
    return false;
  }
  return true;
}, {
  message: "Please specify the number of people when selecting 'other'",
  path: ["guestCountOther"],
})

// Guest Management
export const guestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().optional(),
  phone: z.string().optional(),
})

// Event Management
export const eventSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Please enter a valid date"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time (HH:MM)"),
  venueId: z.string().min(1, "Venue is required"),
})

// Venue Management
export const venueSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  googleMapUrl: z.string().url().optional(),
  description: z.string().optional(),
})

// Media Upload
export const mediaSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]),
  category: z.string().min(1, "Category is required"),
  album: z.string().optional(),
  caption: z.string().optional(),
})

// Hotel Management
export const hotelSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  bookingCode: z.string().optional(),
  discount: z.string().optional(),
  deadline: z.string().optional(),
})

// Live Stream
export const streamSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  streamUrl: z.string().url("Please enter a valid URL"),
  isLive: z.boolean().optional(),
  eventId: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
})

// Admin Login
export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>
export type RSVPFormSubmissionData = z.infer<typeof rsvpFormSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type GuestFormData = z.infer<typeof guestSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type VenueFormData = z.infer<typeof venueSchema>
export type MediaFormData = z.infer<typeof mediaSchema>
export type HotelFormData = z.infer<typeof hotelSchema>
export type StreamFormData = z.infer<typeof streamSchema>
export type AdminLoginFormData = z.infer<typeof adminLoginSchema>

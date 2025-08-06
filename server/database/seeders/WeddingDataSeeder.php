<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeddingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create venues
        $weddingVenue = \App\Models\Venue::create([
            'name' => 'Grand Wedding Hall',
            'address' => '123 Wedding Street',
            'city' => 'Dhaka',
            'state' => 'Dhaka Division',
            'zip_code' => '1000',
            'country' => 'Bangladesh',
            'latitude' => 23.8103,
            'longitude' => 90.4125,
            'phone' => '+880-123-456-7890',
            'description' => 'Beautiful wedding venue in the heart of Dhaka',
            'amenities' => json_encode(['parking', 'wifi', 'air_conditioning', 'sound_system'])
        ]);

        $mehndiVenue = \App\Models\Venue::create([
            'name' => 'Garden Pavilion',
            'address' => '456 Garden Road',
            'city' => 'Dhaka',
            'state' => 'Dhaka Division',
            'zip_code' => '1001',
            'country' => 'Bangladesh',
            'latitude' => 23.8203,
            'longitude' => 90.4225,
            'phone' => '+880-123-456-7891',
            'description' => 'Outdoor garden venue perfect for mehndi ceremonies',
            'amenities' => json_encode(['outdoor_seating', 'catering', 'decorations', 'parking'])
        ]);

        // Create events
        \App\Models\Event::create([
            'name' => 'Mehndi Ceremony',
            'description' => 'Traditional henna ceremony with music and dancing',
            'venue_id' => $mehndiVenue->id,
            'start_time' => '2025-08-15 18:00:00',
            'end_time' => '2025-08-15 22:00:00',
            'dress_code' => 'Traditional/Cocktail Attire',
            'rsvp_required' => true,
            'rsvp_deadline' => '2025-08-01'
        ]);

        \App\Models\Event::create([
            'name' => 'Wedding Ceremony',
            'description' => 'The main wedding ceremony',
            'venue_id' => $weddingVenue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00',
            'dress_code' => 'Formal Attire',
            'rsvp_required' => true,
            'rsvp_deadline' => '2025-08-01'
        ]);

        \App\Models\Event::create([
            'name' => 'Reception Dinner',
            'description' => 'Celebration dinner with family and friends',
            'venue_id' => $weddingVenue->id,
            'start_time' => '2025-08-16 19:00:00',
            'end_time' => '2025-08-16 23:00:00',
            'dress_code' => 'Cocktail Attire',
            'rsvp_required' => true,
            'rsvp_deadline' => '2025-08-01'
        ]);

        // Create sample guests
        \App\Models\Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'phone' => '+1-555-123-4567',
            'rsvp_token' => 'JOHN01',
            'guest_type' => 'primary',
            'city' => 'New York',
            'state' => 'NY',
            'country' => 'USA'
        ]);

        \App\Models\Guest::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane.smith@example.com',
            'phone' => '+1-555-987-6543',
            'rsvp_token' => 'JANE01',
            'guest_type' => 'primary',
            'dietary_restrictions' => 'Vegetarian',
            'city' => 'Los Angeles',
            'state' => 'CA',
            'country' => 'USA'
        ]);

        // Create hotels
        \App\Models\Hotel::create([
            'name' => 'Grand Hotel Dhaka',
            'address' => '789 Hotel Avenue',
            'city' => 'Dhaka',
            'state' => 'Dhaka Division',
            'zip_code' => '1002',
            'country' => 'Bangladesh',
            'phone' => '+880-123-456-7892',
            'website' => 'https://grandhoteldhaka.com',
            'description' => 'Luxury hotel near wedding venues',
            'rate_per_night' => 150.00,
            'booking_code' => 'WEDDING2025',
            'booking_deadline' => '2025-07-15',
            'distance_from_venue' => 2.5,
            'amenities' => json_encode(['wifi', 'pool', 'gym', 'restaurant', 'spa'])
        ]);
    }
}

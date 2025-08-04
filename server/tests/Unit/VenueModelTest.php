<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Venue;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VenueModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_venue_can_be_created()
    {
        $venue = Venue::create([
            'name' => 'Grand Wedding Hall',
            'address' => '123 Main Street',
            'city' => 'Dhaka',
            'state' => 'Dhaka Division',
            'zip_code' => '1000',
            'country' => 'Bangladesh',
            'phone' => '+880-123-456-7890'
        ]);

        $this->assertDatabaseHas('venues', [
            'name' => 'Grand Wedding Hall',
            'city' => 'Dhaka'
        ]);

        $this->assertEquals('Grand Wedding Hall', $venue->name);
        $this->assertEquals('Dhaka', $venue->city);
    }

    public function test_venue_can_have_coordinates()
    {
        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '456 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345',
            'latitude' => 23.8103,
            'longitude' => 90.4125
        ]);

        $this->assertEquals(23.8103, $venue->latitude);
        $this->assertEquals(90.4125, $venue->longitude);
    }

    public function test_venue_can_have_amenities_json()
    {
        $amenities = ['parking', 'wifi', 'air_conditioning'];
        
        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '456 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345',
            'amenities' => json_encode($amenities)
        ]);

        $this->assertEquals($amenities, json_decode($venue->amenities, true));
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Guest;
use App\Models\Event;
use App\Models\Venue;
use App\Models\Rsvp;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RsvpModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_rsvp_can_be_created()
    {
        $guest = Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345'
        ]);

        $event = Event::create([
            'name' => 'Wedding Ceremony',
            'venue_id' => $venue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00'
        ]);

        $rsvp = Rsvp::create([
            'guest_id' => $guest->id,
            'event_id' => $event->id,
            'status' => 'attending',
            'plus_ones' => 1,
            'dietary_restrictions' => 'Vegetarian'
        ]);

        $this->assertDatabaseHas('rsvps', [
            'guest_id' => $guest->id,
            'event_id' => $event->id,
            'status' => 'attending'
        ]);

        $this->assertEquals('attending', $rsvp->status);
        $this->assertEquals(1, $rsvp->plus_ones);
    }

    public function test_rsvp_belongs_to_guest_and_event()
    {
        $guest = Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345'
        ]);

        $event = Event::create([
            'name' => 'Wedding Ceremony',
            'venue_id' => $venue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00'
        ]);

        $rsvp = Rsvp::create([
            'guest_id' => $guest->id,
            'event_id' => $event->id,
            'status' => 'attending'
        ]);

        $this->assertInstanceOf(Guest::class, $rsvp->guest);
        $this->assertInstanceOf(Event::class, $rsvp->event);
        $this->assertEquals($guest->email, $rsvp->guest->email);
        $this->assertEquals($event->name, $rsvp->event->name);
    }

    public function test_guest_event_combination_must_be_unique()
    {
        $guest = Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345'
        ]);

        $event = Event::create([
            'name' => 'Wedding Ceremony',
            'venue_id' => $venue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00'
        ]);

        Rsvp::create([
            'guest_id' => $guest->id,
            'event_id' => $event->id,
            'status' => 'attending'
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        // Try to create duplicate RSVP
        Rsvp::create([
            'guest_id' => $guest->id,
            'event_id' => $event->id,
            'status' => 'not_attending'
        ]);
    }
}

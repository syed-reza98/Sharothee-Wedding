<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Event;
use App\Models\Venue;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_event_can_be_created()
    {
        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345'
        ]);

        $event = Event::create([
            'name' => 'Wedding Ceremony',
            'description' => 'The main wedding ceremony',
            'venue_id' => $venue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00',
            'dress_code' => 'Formal',
            'rsvp_required' => true
        ]);

        $this->assertDatabaseHas('events', [
            'name' => 'Wedding Ceremony',
            'venue_id' => $venue->id
        ]);

        $this->assertEquals('Wedding Ceremony', $event->name);
        $this->assertEquals($venue->id, $event->venue_id);
    }

    public function test_event_belongs_to_venue()
    {
        $venue = Venue::create([
            'name' => 'Test Venue',
            'address' => '123 Test Street',
            'city' => 'Test City',
            'state' => 'Test State',
            'zip_code' => '12345'
        ]);

        $event = Event::create([
            'name' => 'Test Event',
            'venue_id' => $venue->id,
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00'
        ]);

        $this->assertInstanceOf(Venue::class, $event->venue);
        $this->assertEquals($venue->name, $event->venue->name);
    }

    public function test_event_requires_venue()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        Event::create([
            'name' => 'Test Event',
            'start_time' => '2025-08-16 10:00:00',
            'end_time' => '2025-08-16 12:00:00'
            // Missing venue_id
        ]);
    }
}

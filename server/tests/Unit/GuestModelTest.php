<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Guest;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GuestModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_be_created()
    {
        $guest = Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $this->assertDatabaseHas('guests', [
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123'
        ]);

        $this->assertEquals('John', $guest->first_name);
        $this->assertEquals('Doe', $guest->last_name);
    }

    public function test_guest_email_must_be_unique()
    {
        Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Guest::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'john.doe@example.com', // Duplicate email
            'rsvp_token' => 'DEF456',
            'guest_type' => 'primary'
        ]);
    }

    public function test_guest_token_must_be_unique()
    {
        Guest::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'rsvp_token' => 'ABC123',
            'guest_type' => 'primary'
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Guest::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane.smith@example.com',
            'rsvp_token' => 'ABC123', // Duplicate token
            'guest_type' => 'primary'
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'country',
        'rsvp_token',
        'rsvp_status',
        'hotel_id',
        'arrival_time',
        'departure_time',
        'notes',
        'needs_pickup',
        'flight_details'
    ];

    protected $casts = [
        'arrival_time' => 'datetime',
        'departure_time' => 'datetime',
        'needs_pickup' => 'boolean'
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(RSVP::class);
    }

    public static function generateToken(): string
    {
        do {
            $token = bin2hex(random_bytes(16));
        } while (self::where('rsvp_token', $token)->exists());

        return $token;
    }
}
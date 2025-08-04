<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rsvp extends Model
{
    protected $fillable = [
        'guest_id',
        'event_id',
        'status',
        'plus_ones',
        'dietary_restrictions',
        'special_requests',
        'comments',
        'responded_at'
    ];

    protected $casts = [
        'responded_at' => 'datetime',
        'plus_ones' => 'integer'
    ];

    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'event_date',
        'start_time',
        'end_time',
        'venue_id',
        'dress_code',
        'type',
        'is_live_streamed',
        'sort_order'
    ];

    protected $casts = [
        'event_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_live_streamed' => 'boolean'
    ];

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(RSVP::class);
    }

    public function liveStreams(): HasMany
    {
        return $this->hasMany(LiveStream::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('event_date')->orderBy('start_time');
    }
}
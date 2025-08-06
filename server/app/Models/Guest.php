<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guest extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'rsvp_token',
        'guest_type',
        'primary_guest_id',
        'dietary_restrictions',
        'special_requests',
        'address',
        'city',
        'state',
        'zip_code',
        'country'
    ];

    public function primaryGuest(): BelongsTo
    {
        return $this->belongsTo(Guest::class, 'primary_guest_id');
    }

    public function companions(): HasMany
    {
        return $this->hasMany(Guest::class, 'primary_guest_id');
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class);
    }
}

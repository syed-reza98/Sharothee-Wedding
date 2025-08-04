<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'phone',
        'website',
        'description',
        'rate_per_night',
        'booking_code',
        'booking_deadline',
        'latitude',
        'longitude',
        'amenities',
        'distance_from_venue'
    ];

    protected $casts = [
        'rate_per_night' => 'decimal:2',
        'booking_deadline' => 'date',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'distance_from_venue' => 'decimal:2',
        'amenities' => 'array'
    ];
}

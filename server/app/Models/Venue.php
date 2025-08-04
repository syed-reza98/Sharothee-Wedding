<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venue extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'google_maps_url',
        'description'
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
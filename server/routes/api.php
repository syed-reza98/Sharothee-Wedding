<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Venue;
use App\Models\Event;
use App\Models\Guest;
use App\Models\Hotel;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes for the wedding website
Route::get('/venues', [VenueController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);

Route::get('/hotels', [HotelController::class, 'index']);

// RSVP submission endpoint
Route::post('/rsvp', [RsvpController::class, 'store']);

// Get guest by token
Route::get('/guest/{token}', [GuestController::class, 'showByToken']);
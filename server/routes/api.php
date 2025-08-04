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
Route::get('/venues', function () {
    return response()->json([
        'data' => Venue::all(),
        'status' => 'success'
    ]);
});

Route::get('/events', function () {
    return response()->json([
        'data' => Event::with('venue')->get(),
        'status' => 'success'
    ]);
});

Route::get('/hotels', function () {
    return response()->json([
        'data' => Hotel::all(),
        'status' => 'success'
    ]);
});

// RSVP submission endpoint
Route::post('/rsvp', function (Request $request) {
    $validated = $request->validate([
        'guest_token' => 'required|string',
        'event_id' => 'required|exists:events,id',
        'status' => 'required|in:attending,not_attending,maybe',
        'plus_ones' => 'nullable|integer|min:0|max:5',
        'dietary_restrictions' => 'nullable|string|max:500',
    ]);

    $guest = Guest::where('rsvp_token', $validated['guest_token'])->first();
    
    if (!$guest) {
        return response()->json([
            'message' => 'Invalid guest token',
            'status' => 'error'
        ], 404);
    }

    $rsvp = \App\Models\Rsvp::updateOrCreate(
        [
            'guest_id' => $guest->id,
            'event_id' => $validated['event_id']
        ],
        [
            'status' => $validated['status'],
            'plus_ones' => $validated['plus_ones'] ?? 0,
            'dietary_restrictions' => $validated['dietary_restrictions']
        ]
    );

    return response()->json([
        'data' => $rsvp->load(['guest', 'event']),
        'message' => 'RSVP submitted successfully',
        'status' => 'success'
    ]);
});

// Get guest by token
Route::get('/guest/{token}', function ($token) {
    $guest = Guest::where('rsvp_token', $token)->first();
    
    if (!$guest) {
        return response()->json([
            'message' => 'Guest not found',
            'status' => 'error'
        ], 404);
    }

    return response()->json([
        'data' => $guest,
        'status' => 'success'
    ]);
});
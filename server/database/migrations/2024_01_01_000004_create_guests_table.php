<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country');
            $table->string('rsvp_token')->unique();
            $table->enum('rsvp_status', ['pending', 'confirmed', 'declined'])->default('pending');
            $table->foreignId('hotel_id')->nullable()->constrained()->onDelete('set null');
            $table->datetime('arrival_time')->nullable();
            $table->datetime('departure_time')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('needs_pickup')->default(false);
            $table->string('flight_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
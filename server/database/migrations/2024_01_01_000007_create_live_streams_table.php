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
        Schema::create('live_streams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('platform'); // youtube, vimeo, facebook, etc.
            $table->text('embed_link');
            $table->text('stream_url')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_live')->default(false);
            $table->datetime('scheduled_start')->nullable();
            $table->datetime('actual_start')->nullable();
            $table->datetime('actual_end')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_streams');
    }
};
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
        Schema::create('media_galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['image', 'video']);
            $table->string('album')->default('general'); // tuscany-proposal, dubai-engagement, etc.
            $table->string('file_path');
            $table->string('thumbnail_path')->nullable();
            $table->string('original_filename');
            $table->bigInteger('file_size');
            $table->string('mime_type');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_galleries');
    }
};
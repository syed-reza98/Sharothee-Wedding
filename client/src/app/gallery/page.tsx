"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  category: string;
  order: number;
}

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category)))];
  const filteredMedia = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const groupedMedia = filteredMedia.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>);

  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-secondary mb-4 sm:mb-6">
            Our Gallery
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            A visual journey of our love story, from childhood friends to forever partners.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:scale-105'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 sm:py-20">
              <div className="text-4xl sm:text-5xl mb-4">📸</div>
              <p className="text-muted text-sm sm:text-base">Loading gallery...</p>
            </div>
          ) : Object.keys(groupedMedia).length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="text-4xl sm:text-5xl mb-4">📸</div>
              <p className="text-muted text-sm sm:text-base">No photos available yet. Check back soon!</p>
            </div>
          ) : (
            Object.entries(groupedMedia).map(([category, items]) => (
              <div key={category} className="mb-12 sm:mb-16">
                {selectedCategory === 'all' && (
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() => setSelectedImage(item)}
                    >
                      <div className="aspect-square relative">
                        {item.type === 'IMAGE' ? (
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl sm:text-4xl mb-2">🎥</div>
                              <p className="text-xs sm:text-sm text-muted">Video</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="font-medium text-foreground text-sm sm:text-base">{item.title}</h3>
                        {item.description && (
                          <p className="text-xs sm:text-sm text-muted mt-1">{item.description}</p>
                        )}
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-white text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                          View Full Size
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl max-h-full w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 sm:-top-12 right-0 text-white text-xl sm:text-2xl hover:text-gray-300 z-10 bg-black/50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              ✕
            </button>
            <div className="relative">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 sm:p-6 rounded-b-lg">
                <h3 className="font-medium text-lg sm:text-xl mb-1">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-sm sm:text-base opacity-90">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Section */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Share Your Photos
          </h2>
          <p className="text-muted mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have photos of us that you&apos;d like to share? We&apos;d love to add them to our gallery! 
            Tag us on social media or send them directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Share Photos
            </Link>
            <Link
              href="/api/media/download"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
            >
              Download All Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-12 sm:py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Ready to Join Our Celebration?
          </h2>
          <p className="text-muted mb-6 sm:mb-8 text-sm sm:text-base">
            Don&apos;t forget to RSVP and check out our travel information.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Link 
              href="/rsvp"
              className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              RSVP Now
            </Link>
            <Link 
              href="/travel"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
            >
              Travel Info
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

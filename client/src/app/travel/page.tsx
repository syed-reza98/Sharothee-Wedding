import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { PaperAirplaneIcon, BuildingLibraryIcon, MapIcon, SunIcon, CurrencyDollarIcon, BuildingOffice2Icon, AcademicCapIcon, MegaphoneIcon, DevicePhoneMobileIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function TravelPage() {
  // No longer using old accommodations array

  const transportation = [
    {
      title: "Flying to Dhaka",
      icon: PaperAirplaneIcon,
      details: [
        "Main airport: Hazrat Shahjalal International Airport (DAC)",
        "Major airlines: Emirates, Qatar Airways, Turkish Airlines, Singapore Airlines",
        "Average flight time from US: 18-24 hours (with connections)",
        "Peak season: November to February (cooler weather)"
      ]
    },
    {
      title: "Airport Transportation",
  icon: BuildingLibraryIcon,
      details: [
        "Hotel shuttle service available (pre-arranged)",
        "Taxi service: Approximately 45-60 minutes to city center",
        "Ride-sharing: Uber and local apps available",
        "Private car service can be arranged through hotels"
      ]
    },
    {
      title: "Getting to Vietnam",
  icon: MapIcon,
      details: [
        "Fly to Ho Chi Minh City (SGN) then domestic to Phu Quoc (PQC)",
        "Direct international flights to Phu Quoc from some cities",
        "Resort provides airport transfers for group booking",
        "Ferry service available from mainland (longer journey)"
      ]
    }
  ];

  const visaInfo = [
    {
      country: "Bangladesh",
      requirements: [
        "Tourist visa required for most nationalities",
        "Apply at Bangladesh embassy/consulate in your country",
        "Processing time: 7-14 business days",
        "Required documents: Passport, photos, application form, invitation letter"
      ],
      assistance: "We can provide invitation letters and visa assistance"
    },
    {
      country: "Vietnam",
      requirements: [
        "eVisa available for most nationalities",
        "30-day tourist visa (extendable)",
        "Apply online at evisa.xuatnhapcanh.gov.vn",
        "Processing time: 3-5 business days"
      ],
      assistance: "Resort can assist with visa documentation"
    }
  ];

  const tips = [
    {
      title: "Weather",
  icon: SunIcon,
      content: "December in Dhaka: Pleasant and cool (15-25°C). Expect dry weather, low humidity, and lots of sunshine. Light sweaters or shawls are recommended for evenings."
    },
    {
      title: "Currency",
  icon: CurrencyDollarIcon,
      content: "Bangladesh: Bangladeshi Taka (BDT). Vietnam: Vietnamese Dong (VND). USD widely accepted at hotels."
    },
    {
      title: "Health",
  icon: BuildingOffice2Icon,
      content: "Consult your doctor for recommended vaccinations. Drink bottled water. Travel insurance recommended."
    },
    {
      title: "Culture",
  icon: AcademicCapIcon,
      content: "Respectful dress for religious sites. Remove shoes when entering homes/mosques. Modest attire preferred."
    },
    {
      title: "Language",
  icon: MegaphoneIcon,
      content: "Bengali in Bangladesh, Vietnamese in Vietnam. English widely spoken in hotels and tourist areas."
    },
    {
      title: "Connectivity",
  icon: DevicePhoneMobileIcon,
      content: "WiFi available at hotels. Consider local SIM cards for data. International roaming can be expensive."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-secondary mb-4 sm:mb-6">
            Travel & Stay
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about traveling to our wedding celebrations in Bangladesh and Vietnam.
          </p>
        </div>
      </section>

      {/* Accommodations */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
              Accommodations
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            {/* Lakeshore Grand Card */}
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Lakeshore Grand, Gulshan</h3>
              <iframe title="Lakeshore Grand Gulshan Map" src="https://www.google.com/maps?q=Lakeshore+Grand+Gulshan+Dhaka&output=embed" className="w-full h-48 rounded-xl border mb-4" loading="lazy"></iframe>
              <p className="text-gray-900 text-sm">You don’t have to make any reservations for accommodations in Dhaka and these 5-Star Hotels are already booked for the event. Wishing everybody a pleasant stay.</p>
            </div>
            {/* Lakeshore Heights Card */}
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Lakeshore Heights, Gulshan</h3>
              <iframe title="Lakeshore Heights Gulshan Map" src="https://www.google.com/maps?q=Lakeshore+Heights+Gulshan+Dhaka&output=embed" className="w-full h-48 rounded-xl border mb-4" loading="lazy"></iframe>
              <p className="text-gray-900 text-sm">You don’t have to make any reservations for accommodations in Dhaka and these 5-Star Hotels are already booked for the event. Wishing everybody a pleasant stay.</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Vietnam</h3>
              <p className="text-gray-900 text-sm">The reservations for Accommodations will be made for all guests traveling from abroad by the Bride’s Family and Wedding Team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
              Getting There
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
              Transportation options and travel information for your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {transportation.map((transport, index) => (
              <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="mb-2 sm:mb-4 flex justify-center">
                    <transport.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-secondary">
                    {transport.title}
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted">
                  {transport.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="text-primary mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-secondary mb-6">
              Visa Information
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Important visa requirements for traveling to Bangladesh and Vietnam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {visaInfo.map((visa, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-serif font-semibold text-secondary mb-4">
                  {visa.country} Visa
                </h3>
                <ul className="space-y-2 text-sm text-muted mb-4">
                  {visa.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-muted mb-4 sm:mb-6 text-sm sm:text-base">
              Need help with visa applications or have questions?
            </p>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Contact Our Travel Team
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
              Travel Tips
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
              Helpful information to make your trip smooth and enjoyable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="mb-2 sm:mb-3 flex justify-center">
                    <tip.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{tip.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted text-center leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 sm:py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            24/7 Travel Support
          </h2>
          <p className="text-muted mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our travel support team is available around the clock to assist you during your journey.
          </p>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <div className="mb-3 sm:mb-4 flex justify-center">
              <PhoneIcon className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-lg sm:text-xl">Emergency Travel Hotline</h3>
            <ul className="space-y-1 mb-4 sm:mb-6">
              <li className="text-primary font-medium text-lg sm:text-xl">Rana: <a href="tel:+8801793403767" className="hover:underline">+880 17 9340 3767</a></li>
              <li className="text-primary font-medium text-lg sm:text-xl">Tahamina: <a href="tel:+8801799997024" className="hover:underline">+880 17 9999 7024</a></li>
              <li className="text-primary font-medium text-lg sm:text-xl">Fazlu: <a href="tel:+8801713302987" className="hover:underline">+880 17 1330 2987</a></li>
              <li className="text-primary font-medium text-lg sm:text-xl">Lalin: <a href="tel:+8801730012090" className="hover:underline">+880 17 3001 2090</a></li>
            </ul>
            <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6">Available 24/7 for urgent travel assistance</p>
            <Link
              href="/contact"
              className="text-primary hover:text-primary-dark font-medium text-sm sm:text-base transition-colors"
            >
              More Contact Options →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

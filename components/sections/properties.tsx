import { Card, CardTitle, CardDescription } from "@/components/ui";
import { Home, MapPin, Bed, Bath, Square } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$4,500,000",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image: "🏡",
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: "$8,200,000",
    beds: 3,
    baths: 3,
    sqft: "3,500",
    image: "🏢",
  },
  {
    id: 3,
    title: "Coastal Estate",
    location: "Malibu, CA",
    price: "$12,000,000",
    beds: 6,
    baths: 5,
    sqft: "6,800",
    image: "🌊",
  },
  {
    id: 4,
    title: "Urban Loft",
    location: "Brooklyn, NY",
    price: "$2,800,000",
    beds: 2,
    baths: 2,
    sqft: "2,100",
    image: "🏙️",
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: "$5,500,000",
    beds: 4,
    baths: 3,
    sqft: "3,900",
    image: "⛰️",
  },
  {
    id: 6,
    title: "Waterfront Mansion",
    location: "Miami Beach, FL",
    price: "$9,800,000",
    beds: 7,
    baths: 6,
    sqft: "8,500",
    image: "🌴",
  },
];

export function PropertiesSection() {
  return (
    <section id="properties" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our curated selection of luxury homes and investment properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="aspect-video bg-gradient-to-br from-amber-700/20 to-stone-700/20 rounded-t-2xl flex items-center justify-center text-6xl mb-4">
                {property.image}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <span className="text-lg font-bold text-amber-500">{property.price}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}

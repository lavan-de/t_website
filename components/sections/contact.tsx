import { Button } from "@/components/ui";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400">
              Ready to find your dream property? Contact us today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5">
              <Phone className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5">
              <Mail className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400">info@soezestates.com</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-white/10 bg-white/5">
              <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Office</h3>
              <p className="text-gray-400">123 Luxury Ave, Beverly Hills</p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg">Schedule a Consultation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

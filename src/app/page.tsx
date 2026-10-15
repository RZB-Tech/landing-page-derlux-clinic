import { doctors } from "@/data/doctors";
import { bookingDaysAhead } from "@/data/home";
import { homeJsonLd, toJsonLdScript } from "@/lib/jsonld";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Booking } from "@/components/sections/Booking";
import { Checkups } from "@/components/sections/Checkups";
import { Concerns } from "@/components/sections/Concerns";
import { Contacts } from "@/components/sections/Contacts";
import { Directions } from "@/components/sections/Directions";
import { Doctors } from "@/components/sections/Doctors";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Promotions } from "@/components/sections/Promotions";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <BookingProvider doctors={doctors} daysAhead={bookingDaysAhead}>
      <Header />
      <main>
        <Hero />
        <Directions />
        <Concerns />
        <Services />
        <Doctors />
        <Checkups />
        <Promotions />
        <Reviews />
        <Booking />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(homeJsonLd()) }} />
    </BookingProvider>
  );
}

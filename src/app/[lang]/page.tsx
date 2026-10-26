import { notFound } from "next/navigation";
import { getDoctors } from "@/data/doctors";
import { bookingDaysAhead } from "@/data/home";
import { hasLocale } from "@/i18n/config";
import { homeJsonLd, toJsonLdScript } from "@/lib/jsonld";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Booking } from "@/components/sections/Booking";
// import { Checkups } from "@/components/sections/Checkups"; // hidden for now, see <main> below
// import { Concerns } from "@/components/sections/Concerns"; // hidden for now, see <main> below
import { Contacts } from "@/components/sections/Contacts";
import { Directions } from "@/components/sections/Directions";
import { Doctors } from "@/components/sections/Doctors";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
// import { Promotions } from "@/components/sections/Promotions"; // hidden for now, see <main> below
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <BookingProvider locale={lang} doctors={getDoctors(lang)} daysAhead={bookingDaysAhead}>
      <Header locale={lang} />
      <main>
        <Hero locale={lang} />
        <Directions locale={lang} />
        {/* Hidden at the client's request; may be added back later. To restore: uncomment this line and the Concerns import. */}
        {/* <Concerns locale={lang} /> */}
        <Services locale={lang} />
        <Doctors locale={lang} />
        {/* Hidden at the client's request; may be added back later. To restore: uncomment this line and the Checkups import. */}
        {/* <Checkups locale={lang} /> */}
        {/* Hidden at the client's request; may be added back later. To restore: uncomment this line and the Promotions import. */}
        {/* <Promotions locale={lang} /> */}
        <Reviews locale={lang} />
        <Booking locale={lang} />
        <Faq locale={lang} />
        <Contacts locale={lang} />
      </main>
      <Footer locale={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(homeJsonLd(lang)) }} />
    </BookingProvider>
  );
}

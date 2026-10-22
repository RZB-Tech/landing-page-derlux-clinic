import { getCheckups } from "@/data/checkups";
import { getClinic, primaryPhone } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getDoctors } from "@/data/doctors";
import { bookingSlots, getHome } from "@/data/home";
import { getServices } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { Icon } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";
import { BookingForm } from "./BookingForm";

/** «Запишитесь за минуту — без звонков» (Figma «11 Онлайн-запись»). */
export function Booking({ locale }: { locale: Locale }) {
  const clinic = getClinic(locale);
  const { bookingForm, bookingSection } = getHome(locale);
  return (
    <section id="booking" aria-labelledby="booking-title" className="bg-accent text-on-dark">
      <div className="page-x flex flex-col gap-12 py-14 md:py-16 xl:flex-row xl:items-center xl:justify-between xl:gap-16 xl:py-20">
        <div className="flex flex-col items-start gap-5 xl:w-120">
          <Caption onDark>{bookingSection.caption}</Caption>
          <AccentTitle id="booking-title" text={bookingSection.title} />
          <p className="max-w-120 text-body opacity-85">{bookingSection.lead}</p>
          <div className="flex flex-wrap items-center gap-6 text-label font-medium">
            <a href={`tel:${primaryPhone.e164}`} className="flex items-center gap-2 hover:opacity-80">
              <Icon name="phone-on-dark" size={18} />
              {primaryPhone.display}
            </a>
            <a href={clinic.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80">
              <Icon name="send-on-dark" size={18} />
              {bookingSection.telegramLabel}
            </a>
          </div>
        </div>

        <BookingForm
          locale={locale}
          directions={getDirections(locale)}
          checkups={getCheckups(locale)}
          doctors={getDoctors(locale)}
          services={getServices(locale)}
          slots={bookingSlots}
          copy={bookingForm}
          address={`${clinic.address.city}, ${clinic.address.street}`}
          phone={primaryPhone}
        />
      </div>
    </section>
  );
}

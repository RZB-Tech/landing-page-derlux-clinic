import { checkups } from "@/data/checkups";
import { clinic, primaryPhone } from "@/data/clinic";
import { directions } from "@/data/directions";
import { doctors } from "@/data/doctors";
import { bookingForm, bookingSection, bookingSlots } from "@/data/home";
import { services } from "@/data/services";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { Icon } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";
import { BookingForm } from "./BookingForm";

/** «Запишитесь за минуту — без звонков» (Figma «11 Онлайн-запись»). */
export function Booking() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="bg-accent text-on-dark">
      <div className="page-x flex flex-col gap-12 py-20 md:py-24 xl:flex-row xl:items-start xl:justify-between xl:py-40">
        <div className="flex flex-col items-start gap-7 xl:w-140">
          <Caption onDark>{bookingSection.caption}</Caption>
          <AccentTitle id="booking-title" text={bookingSection.title} />
          <p className="max-w-120 text-body opacity-85">{bookingSection.lead}</p>
          <ol className="w-full border-t border-on-dark">
            {bookingSection.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-5 border-b border-on-dark py-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-on-dark text-label font-medium">
                  {i + 1}
                </span>
                <span className="text-title font-semibold">{step}</span>
              </li>
            ))}
          </ol>
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
          directions={directions}
          checkups={checkups}
          doctors={doctors}
          services={services}
          slots={bookingSlots}
          copy={bookingForm}
          steps={bookingSection.steps}
          address={`${clinic.address.city}, ${clinic.address.street}`}
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import { getDoctors } from "@/data/doctors";
import { getHome } from "@/data/home";
import type { Doctor } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { buttonClassName } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";

function yearsLabel(n: number, locale: Locale) {
  if (locale === "uz") return "yil";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
  return "лет";
}

/** «Стаж 12 лет · Высшая категория», from whichever of the two the clinic has given. */
function doctorFacts({ experienceYears, category }: Doctor, experienceLabel: string, locale: Locale) {
  const experience =
    experienceYears !== undefined && `${experienceLabel} ${experienceYears} ${yearsLabel(experienceYears, locale)}`;
  return [experience, category].filter(Boolean).join(" · ");
}

/**
 * «Врачи, которые слушают» (Figma «05 Врачи»). Carousel below md, grid above. Figma has four
 * 302px cards; the clinic has three doctors, so they share the row in three columns.
 */
export function Doctors({ locale }: { locale: Locale }) {
  const { doctorsCopy, doctorsSection } = getHome(locale);
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="doctors-title" {...doctorsSection} />
        <ul className="snap-row md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {getDoctors(locale).map((doctor) => {
            const facts = doctorFacts(doctor, doctorsCopy.experience, locale);
            return (
              <li key={doctor.id} className="flex w-70 flex-col items-start gap-2.5 md:w-auto">
                <div className="arch-doctor relative aspect-302/392 w-full overflow-hidden bg-sand">
                  <Image
                    src={doctor.photo.src}
                    alt={doctor.photo.alt}
                    fill
                    sizes="(min-width: 1440px) 411px, (min-width: 768px) 30vw, 280px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-title font-semibold text-ink">{doctor.name}</h3>
                <p className="text-small text-graphite">{doctor.position}</p>
                {facts && <p className="text-small text-graphite">{facts}</p>}
                <BookingTrigger
                  preset={{ doctorId: doctor.id }}
                  className={buttonClassName({ variant: "secondary", fullWidth: true, className: "mt-auto" })}
                >
                  {doctorsCopy.cta}
                </BookingTrigger>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import { doctors } from "@/data/doctors";
import { doctorsCopy, doctorsSection } from "@/data/home";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { buttonClassName } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";

function yearsLabel(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
  return "лет";
}

/** «Врачи, которые слушают» (Figma «05 Врачи»). Carousel below md, grid above. */
export function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="doctors-title" {...doctorsSection} />
        <ul className="snap-row md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="flex w-70 flex-col items-start gap-2.5 md:w-auto">
              <div className="arch-doctor relative aspect-302/392 w-full overflow-hidden bg-sand">
                <Image
                  src={doctor.photo.src}
                  alt={doctor.photo.alt}
                  fill
                  sizes="(min-width: 1440px) 302px, (min-width: 1280px) 22vw, (min-width: 768px) 45vw, 280px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-title font-semibold text-ink">{doctor.name}</h3>
              <p className="text-small text-graphite">{doctor.position}</p>
              <p className="text-small text-graphite">
                {doctorsCopy.experience} {doctor.experienceYears} {yearsLabel(doctor.experienceYears)} · {doctor.category}
              </p>
              <BookingTrigger
                preset={{ doctorId: doctor.id }}
                className={buttonClassName({ variant: "secondary", fullWidth: true })}
              >
                {doctorsCopy.cta}
              </BookingTrigger>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

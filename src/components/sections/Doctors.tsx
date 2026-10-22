import { getDirections } from "@/data/directions";
import { getDoctors } from "@/data/doctors";
import { getHome } from "@/data/home";
import { getServices } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { formatPriceFrom } from "@/lib/format";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { DoctorsGrid, type DoctorView } from "./DoctorsGrid";

function yearsLabel(n: number, locale: Locale) {
  if (locale === "uz") return "yil";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
  return "лет";
}

/**
 * «Врачи, которые слушают». Each card opens a dialog with the doctor's details. All data is
 * resolved here, on the server, into ready-made strings for the client grid.
 */
export function Doctors({ locale }: { locale: Locale }) {
  const { doctorsCopy, doctorsSection } = getHome(locale);
  const directions = getDirections(locale);
  const services = getServices(locale);

  const doctors: DoctorView[] = getDoctors(locale).map((doctor) => {
    const own = directions.filter((d) => doctor.directionIds.includes(d.id));
    const seen = new Set<string>();
    const priced = services
      .filter((s) => doctor.directionIds.includes(s.directionId))
      .filter((s) => !seen.has(s.name) && seen.add(s.name))
      .slice(0, 5)
      .map((s) => ({ id: s.id, name: s.name, price: formatPriceFrom(s.price, locale) }));
    const facts = [
      doctor.experienceYears !== undefined &&
        `${doctorsCopy.experience} ${doctor.experienceYears} ${yearsLabel(doctor.experienceYears, locale)}`,
      doctor.category,
    ].filter((f): f is string => Boolean(f));
    return {
      id: doctor.id,
      name: doctor.name,
      position: doctor.position,
      photo: doctor.photo,
      facts,
      focus: doctor.focus,
      documents: doctor.documents ?? [],
      directions: own.map((d) => d.name),
      services: priced,
    };
  });

  return (
    <section id="doctors" aria-labelledby="doctors-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-16 md:gap-12 md:py-20 xl:py-28">
        <Reveal>
          <SectionHead titleId="doctors-title" {...doctorsSection} link={undefined} />
        </Reveal>
        <DoctorsGrid doctors={doctors} copy={doctorsCopy} />
      </div>
    </section>
  );
}

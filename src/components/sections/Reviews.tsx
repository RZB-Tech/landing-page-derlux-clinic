import { getHome } from "@/data/home";
import { getRatingSummary, getReviews } from "@/data/reviews";
import type { Locale } from "@/i18n/config";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

function Stars({ count, size }: { count: number; size: 16 | 18 }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name={size === 18 ? "star-18" : "star-16"} size={size} />
      ))}
    </span>
  );
}

/** «Что говорят пациенты» (Figma «10 Отзывы»). Carousel below xl. */
export function Reviews({ locale }: { locale: Locale }) {
  const { reviewsSection } = getHome(locale);
  const ratingSummary = getRatingSummary(locale);
  return (
    <section aria-labelledby="reviews-title" className="bg-sand">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead
          titleId="reviews-title"
          {...reviewsSection}
          aside={
            <div className="flex items-center gap-4">
              <p className="font-display text-display-h2 font-medium text-ink">{ratingSummary.valueLabel}</p>
              <div className="flex flex-col gap-1.5">
                <Stars count={5} size={18} />
                <p className="text-small text-graphite">{ratingSummary.source}</p>
              </div>
            </div>
          }
        />
        <ul className="snap-row xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:overflow-visible xl:px-0">
          {getReviews(locale).map((review) => (
            <li key={review.id} className="flex min-h-77.5 w-85 flex-col items-start gap-6 rounded-card bg-white p-9 md:w-102.5 xl:w-auto">
              <figure className="contents">
                <Stars count={review.rating} size={16} />
                <blockquote className="text-quote text-ink">«{review.text}»</blockquote>
                <div className="flex-1" />
                <hr className="w-full border-line-soft" />
                <figcaption className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-title font-semibold text-accent"
                  >
                    {review.author.charAt(0)}
                  </span>
                  <span className="flex flex-col gap-0.5 text-small">
                    <span className="text-label font-medium text-ink">
                      {review.author}, {review.ageLabel}
                    </span>
                    <span className="text-graphite">
                      {review.topic} · {review.dateLabel}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

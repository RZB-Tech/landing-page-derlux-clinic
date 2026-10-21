import Image from "next/image";
import { introSplash } from "@/data/home";
import { LogoArt } from "./Logo";
import { IntroSplashShell } from "./IntroSplashShell";

const SEEN_KEY = "derlux-intro-seen";

/**
 * Splash on entering the site: the clinic's reception, darkened, with the logo and a loader that
 * fills over `introSplash.durationMs`; once per browser session. The inline script runs before the
 * overlay is parsed, so a visitor who has seen it this session never gets a flash of it. The dark
 * background keeps the logo readable while the photo loads.
 */
export function IntroSplash() {
  const { image, durationMs } = introSplash;
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${SEEN_KEY}"))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`,
        }}
      />
      <IntroSplashShell durationMs={durationMs} seenKey={SEEN_KEY}>
        <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover object-[71%_45%]" />
        {/* Darkens the photo, most at the bottom, where the logo and the loader sit — away from the
            logo on the reception wall in the photo. */}
        <div className="absolute inset-0 bg-linear-to-b from-ink/35 via-ink/55 to-ink/95" />
        {/* Spinner in the middle: a gold arc turning on a faint ring, on a dark frosted disc so it
            reads over the bright reception desk too. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm md:size-24">
            <span className="size-10 animate-spin rounded-full border-2 border-on-dark/25 border-t-logo-gold motion-reduce:animate-none md:size-12" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-7 pb-16 md:gap-8 md:pb-20">
          <LogoArt onDark className="h-12 md:h-16" />
          {/* Loader: fills over the same time the splash stays up. */}
          <div className="h-0.5 w-40 overflow-hidden rounded-full bg-on-dark/20 md:w-56">
            <div className="intro-progress h-full bg-logo-gold" style={{ animationDuration: `${durationMs}ms` }} />
          </div>
        </div>
      </IntroSplashShell>
    </>
  );
}

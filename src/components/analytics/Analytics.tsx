import Script from "next/script";
import { clinic } from "@/data/clinic";
import { analyticsIds } from "@/lib/analytics";
import { LinkGoals } from "./LinkGoals";

/**
 * GA4 and Yandex Metrika counters, loaded after hydration. Webvisor (session recording) stays off:
 * the booking form collects names and phone numbers.
 */
export function Analytics() {
  const { ga, ym } = analyticsIds;
  if (!ga && !ym) return null;

  return (
    <>
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
          <Script id="ga-init">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${ga}");`}
          </Script>
        </>
      )}
      {ym && (
        <Script id="ym-init">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
        </Script>
      )}
      <LinkGoals telegramUrl={clinic.telegramUrl} routeUrl={clinic.map.routeUrl} />
    </>
  );
}
